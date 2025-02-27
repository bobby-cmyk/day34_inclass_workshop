import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../../giphy.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy{

  private giphySvc = inject(GiphyService)

  // Create a subscription variable so that we can destroy
  private sub!: Subscription

  gifs: string[] = []

  ngOnInit(): void {
    this.sub = this.giphySvc.searchResults.subscribe({
      next: (gifs) => this.gifs = gifs
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  
}
