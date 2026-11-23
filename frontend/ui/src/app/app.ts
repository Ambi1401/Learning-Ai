
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiService } from './services/ai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  provider = 'openai';

  prompt = '';

  response = signal('');

  selectedModel = signal('');

  loading = signal(false);

  error = signal('');

  constructor(private aiService: AiService) {}

  generateResponse(): void {

    if (!this.prompt.trim() || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.response.set('');
    this.error.set('');
    this.selectedModel.set('');

    this.aiService.generateResponse({
      provider: this.provider,
      prompt: this.prompt.trim()
    }).subscribe({

      next: (result) => {

        this.response.set(result.data.response);
        this.selectedModel.set(result.data.model);

        this.loading.set(false);
      },

      error: (err) => {

        this.error.set(err.error?.message || 'Something went wrong');

        this.loading.set(false);
      }
    });
  }
}
