export class ClaudeProvider {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.getApiKeyFromEnv();
  }

  private getApiKeyFromEnv(): string {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY environment variable is not set. Get one at https://console.anthropic.com/settings/keys'
      );
    }
    return apiKey;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async call(prompt: string, maxRetries: number = 5): Promise<any> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          const error = new Error(
            `Claude API error: ${response.status} - ${errorText}`
          );

          // Check if it's a rate limit error (429)
          if (response.status === 429 && attempt < maxRetries) {
            // Wait 60 seconds to let the rate limit window reset (rate limits are per minute)
            const delayMs = 60000;
            console.log(
              `Rate limit hit. Waiting ${delayMs / 1000}s for rate limit window to reset... (attempt ${attempt + 1}/${maxRetries})`
            );
            await this.sleep(delayMs);
            lastError = error;
            continue;
          }

          throw error;
        }

        const data = await response.json();
        const content = data.content
          .map((item: any) => (item.type === 'text' ? item.text : ''))
          .filter(Boolean)
          .join('\n');

        const cleanContent = content.replace(/```json|```/g, '').trim();

        try {
          return JSON.parse(cleanContent);
        } catch (parseError) {
          console.error('Failed to parse AI response as JSON. Raw response:');
          console.error(cleanContent);
          throw new Error(
            `Failed to parse AI response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`
          );
        }
      } catch (error) {
        // If it's not a rate limit error or we've exhausted retries, throw
        if (
          attempt === maxRetries ||
          !(error instanceof Error && error.message.includes('429'))
        ) {
          throw error;
        }
        lastError = error;
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }
}
