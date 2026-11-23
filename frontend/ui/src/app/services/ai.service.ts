
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AIRequest {
  provider: string;
  prompt: string;
}

export interface AIResponse {
  success: boolean;
  data: {
    provider: string;
    model: string;
    response: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly apiUrl = 'http://localhost:3000/api/ai';

  constructor(private http: HttpClient) {}

  generateResponse(request: AIRequest): Observable<AIResponse> {
    return this.http.post<AIResponse>(
      `${this.apiUrl}/generate`,
      request
    );
  }
}