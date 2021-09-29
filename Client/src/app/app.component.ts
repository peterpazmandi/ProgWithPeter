import { Component, OnInit } from '@angular/core';
import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Programming with Peter';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if(theme) {
      this.themeService.setTheme(theme);
    }
  }
}
