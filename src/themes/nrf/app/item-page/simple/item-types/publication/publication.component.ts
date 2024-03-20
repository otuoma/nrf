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

  usageReport: UsageReport[];
  totalVisits: UsageReport;
  totalVisitsPerMonth: UsageReport;
  topCountries: UsageReport;
  topCities: UsageReport;
  totalDownloads: UsageReport;
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
    console.log('=========');
    console.log('=========');
    let report = this.usageReportDataService
      .searchStatistics(this.object._links.self.href, 0, 10);

    report.subscribe((uReport: UsageReport[]) => {
      this.usageReport = uReport;
      console.log(this.usageReport);
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
    let chart = Highcharts.chart('downloadsBarGraphContainer',{
      series: [
        {
          type: 'line',
          data: [1, 2, 3, 4],
        },
      ],
      }
    );
    // chart.container = this.downloadsRenderTo.nativeElement;
  }
}
