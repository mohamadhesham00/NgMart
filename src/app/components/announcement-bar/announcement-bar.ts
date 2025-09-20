import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-announcement-bar',
  imports: [CommonModule, CarouselModule, TagModule],
  templateUrl: './announcement-bar.html',
  styleUrl: './announcement-bar.css',
})
export class AnnouncementBar {
  announcements = [
    'Flash Sale! ⚡️ 20% off all summer collections for the next 24 hours only.',
    'Buy One, Get One 50% Off! Mix and match your favorite items.',
    `Last Chance! Our End-of-Season Sale is about to end.`,
    `Grab your favorites before they're gone!`,
    'Get a Free Gift with every order over $75.',
  ];
}
