import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentPage: number = 1;
  reposPerPage: number = 10;
  githubRepos: Array<any> = [];
  githubApiUrl: string = "https://api.github.com/repositories";

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.updateGithubRepos();
  }

  // Show the previous repositories
  next_page() {
    this.currentPage++
    this.updateGithubRepos()
  }

  // Show the next repositories
  previous_page() {
    if (this.currentPage == 1)
      return

    this.currentPage--
    this.updateGithubRepos()
  }

  // Get the repositories considering the current page number
  updateGithubRepos() {
    // A proper way to handle pagination would be using the Link Haader provided by the Github API
    // unfortunately I'm not able to read the headers of the API, it might either be a bug on their side or on my side
    this.http.get<Array<any>>(this.githubApiUrl+"?since="+this.currentPage*10)
    .subscribe(data => {
      this.githubRepos = data.slice(0, this.reposPerPage);
    }
    , err => {
      console.log(err)
    });
  }

}
