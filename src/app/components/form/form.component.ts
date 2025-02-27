import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiphyService } from '../../giphy.services';
import { SearchCriteria } from '../../models';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  
  private fb = inject(FormBuilder)
  private giphySvc = inject(GiphyService)

  protected searchForm!: FormGroup

  protected resultsCount: number = 5

  ngOnInit(): void {
    this.searchForm = this.createSearchForm()
  }

  protected search() {
    const criteria : SearchCriteria = this.searchForm.value
    this.giphySvc.searchGifs(criteria)
      .then(result => {
        console.info('>>> search results: ',result)
      })
  }

  protected limitChange() {
    this.resultsCount = this.searchForm.get('limit')?.value
    console.info('Current results count: ', this.resultsCount)
  }

  private createSearchForm() : FormGroup {
    return this.fb.group({
      q : this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      limit: this.fb.control<number>(5, [Validators.required]),
      rating: this.fb.control<string>('pg', [Validators.required])
    })
  }
}
