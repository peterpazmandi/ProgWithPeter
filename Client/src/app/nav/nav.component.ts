import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  collapsed = true;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  onToggleTheme() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
  
  onToggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
