import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { AiService } from './services/ai.service';

describe('App', () => {
  const aiService = {
    generateResponse: () => of({
      success: true,
      data: {
        provider: 'openai',
        model: 'test-model',
        response: 'Generated answer',
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: AiService, useValue: aiService }],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('AI Playground');
  });

  it('should show a successful response and clear the loading status', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.prompt = 'Test prompt';

    app.generateResponse();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.response-content')?.textContent).toContain('Generated answer');
    expect(compiled.querySelector('.status')).toBeNull();
  });
});
