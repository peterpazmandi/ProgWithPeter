import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isChecked$ = new BehaviorSubject(false);
  collapsed = true;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  onToggleTheme() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
      this.isChecked$.next(true)
    } else {
      this.themeService.setTheme('light');
      this.isChecked$.next(false)
    }
  }
  
  onToggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
