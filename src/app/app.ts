import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Header } from './components/header/header';
import { ProductCarousel } from './components/product-carousel/product-carousel';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('NgMart');
}
