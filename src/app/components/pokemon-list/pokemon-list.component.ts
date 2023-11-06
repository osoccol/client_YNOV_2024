import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/News';
import { Pokemon } from 'src/app/models/Pokemon';
import { NewsService } from 'src/app/services/news.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  public pokemons: Pokemon[] = [];
  public news?: News;

  constructor(private pokemonService: PokemonService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.pokemonService.getPokemonList().then((response) => {
      if (response) {
        this.pokemons = response;
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  getNews(pokemon: string = 'Pikachu', date: Date = new Date('2023-10-06')) {
    this.newsService.getNews(pokemon, date).then((res) => {
      this.news = res;      
    })
  }

}
