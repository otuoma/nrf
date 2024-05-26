import {Component} from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent extends BaseComponent {
}
