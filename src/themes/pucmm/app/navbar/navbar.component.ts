import {Component, ElementRef, ViewChild} from '@angular/core';

import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  animations: [slideMobileNav],
})
export class NavbarComponent extends BaseComponent {

  @ViewChild('mainNav') mainNav: ElementRef;
  toggleNavbarHeight(): void {
    let navHeight = this.mainNav.nativeElement.style.height;
    if (navHeight === '0px'){
      this.mainNav.nativeElement.style.height = '100%';
      this.mainNav.nativeElement.style.position = 'relative';
    } else {
      this.mainNav.nativeElement.style.height = '0px';
    }
  }

  openDropdown(dropdown: NgbDropdown) {
    dropdown.open();
  }

  closeDropdown(dropdown: NgbDropdown) {
    dropdown.close();
  }
}
