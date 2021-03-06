import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (!this.hero) this.getHero();
  }

  getHero() {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (!this.hero) return;
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  
}
