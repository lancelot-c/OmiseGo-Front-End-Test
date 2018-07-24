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

  next_page() {
    this.currentPage++
    this.updateGithubRepos()
  }

  previous_page() {
    if (this.currentPage == 1)
      return

    this.currentPage--
    this.updateGithubRepos()
  }

  updateGithubRepos() {
    this.http.get<Array<any>>(this.githubApiUrl+"?since="+this.currentPage*10)
    // PROVIDED BY GITHUB API BUT NOT WORKING : +"&page="+this.currentPage+"&per_page="+this.reposPerPage)
    .subscribe(data => {
      // console.log(data);
      // console.log(this.githubRepos);
      this.githubRepos = data.slice(0, this.reposPerPage);
    }
    , err => {
      console.log(err)
    });
  }
}
