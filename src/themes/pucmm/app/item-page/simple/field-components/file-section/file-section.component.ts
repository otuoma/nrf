import {Component, Input, OnInit} from '@angular/core';
import { slideSidebarPadding } from '../../../../../../../app/shared/animations/slide';
import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';
import {UsageReport} from '../../../../../../../app/core/statistics/models/usage-report.model';

@Component({
    selector: 'ds-item-page-file-section',
    templateUrl: './file-section.component.html',
    animations: [slideSidebarPadding],
})
export class FileSectionComponent extends BaseComponent implements OnInit{
  @Input() itemDownloads: UsageReport;

  ngOnInit() {
    super.ngOnInit();
    console.log('=======================mayoooooooooooooo', this.itemDownloads);
  }
}
