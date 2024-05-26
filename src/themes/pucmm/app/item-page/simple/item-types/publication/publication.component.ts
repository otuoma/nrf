import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { PublicationComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';
import {RouteService} from '../../../../../../../app/core/services/route.service';
import {Router} from '@angular/router';
import {UsageReportDataService} from '../../../../../../../app/core/statistics/usage-report-data.service';
import {UsageReport} from '../../../../../../../app/core/statistics/models/usage-report.model';
import * as Highcharts from 'highcharts';

import HC_histogram from 'highcharts/modules/histogram-bellcurve';


/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'nrf')
@Component({
  selector: 'ds-publication',
  styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
  templateUrl: './publication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationComponent extends BaseComponent implements OnInit {

  usageReport: UsageReport[] | null;
  totalVisits: UsageReport | null;
  totalVisitsPerMonth: UsageReport | null;
  topCountries: UsageReport | null;
  topCities: UsageReport | null;
  totalDownloads: UsageReport | null;
  // Highcharts: typeof Highcharts = Highcharts;

  constructor(
    protected routeService: RouteService,
    protected router: Router,
    protected usageReportDataService: UsageReportDataService,
  ) {
    super(routeService, router);
  }

  ngOnInit() {

    super.ngOnInit();
    let report = this.usageReportDataService
      .searchStatistics(this.object._links.self.href, 0, 20);

    report.subscribe((uReport: UsageReport[]) => {
      this.usageReport = uReport;
      // console.log(this.usageReport);
      uReport.forEach( repo =>{

        if (repo.reportType === 'TotalVisits'){
          this.totalVisits = repo;
        }

        if (repo.reportType === 'TotalVisitsPerMonth'){
          this.totalVisitsPerMonth = repo;
        }

        if (repo.reportType === 'TopCountries'){
          this.topCountries = repo;
        }

        if (repo.reportType === 'TopCities'){
          this.topCities = repo;
        }
        if (repo.reportType === 'TotalDownloads'){
          this.totalDownloads = repo;
        }

      });

      this.renderDownloadsBarGraph();
    });
  }

  hasData(usageReport: UsageReport): boolean{
    return usageReport.points.length > 0;
  }

  renderDownloadsBarGraph(){
    console.log('====RENDERED=====');
    console.log('=========');
    let chart = Highcharts.chart('downloadsBarGraphContainer',{

      }
    );
  }

  totalBitstreamsDownloads(totalDownloads: UsageReport): number{
    let totalBitstreamsDownloads = 0;
    totalBitstreamsDownloads += this.totalDownloads.points.reduce((accumulator, currentValue, currentIndex) => accumulator + currentValue.values[currentIndex].views, totalBitstreamsDownloads);


    return totalBitstreamsDownloads;
  }
}
