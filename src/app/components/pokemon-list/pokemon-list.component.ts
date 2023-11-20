import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/News';
import { Pokemon } from 'src/app/models/Pokemon';
import { AuthService } from 'src/app/services/auth.service';
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

  public googleAccount?: any;

  constructor(private pokemonService: PokemonService, private newsService: NewsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getList();
    this.checkGoogleToken();
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

  getNews(pokemon: string = 'Pikachu', date: Date = new Date('2023-11-06')) {
    this.newsService.getNews(pokemon, date).then((res) => {
      this.news = res;      
    })
  }

  checkGoogleToken() {
    let hasToken = this.authService.hasToken();
    if (hasToken) {
      this.authService.loginWithGoogle().then((res: any) => {
        console.log(res);
        this.googleAccount = {
          email: res.email,
          name: res.given_name,
          surname: res.family_name,
        }
      }).catch((err) => {
        console.log(err);
      })
      
    } else {
      console.log('TOKEN UNDEFINED');
    }
  }

}
