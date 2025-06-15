import { Component } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit{

  constructor(private router: Router) { }

    ngOnInit(): void {
    }

  doSearch(value: string) {

    this.router.navigateByUrl(`/search/${value}`)
  }

}
