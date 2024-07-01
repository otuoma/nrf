import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
import * as Highcharts from 'highcharts';

import {Community} from '../../../../../app/core/shared/community.model';
import {APP_CONFIG, AppConfig} from '../../../../../config/app-config.interface';
import {CommunityDataService} from '../../../../../app/core/data/community-data.service';
import {PaginationService} from '../../../../../app/core/pagination/pagination.service';
import {SeriesOptionsType} from 'highcharts';
import { Slide } from './slide.model';

@Component({
  selector: 'ds-top-level-community-list',
  templateUrl: './top-level-community-list.component.html'
})
export class TopLevelCommunityListComponent extends BaseComponent implements OnInit{

  slides: Slide[] = [];
  groupedSlides: Slide[][] = [];

  communitiesList: Community[];
  data: {name: string, y: number}[] = [];
  updateFlag = false;
  series: SeriesOptionsType = {
    type: 'pie',
    name: '', startAngle: 315,
    innerSize: '50%',
    data: [],
    dataLabels: {
      enabled: true,
      alignTo: 'connectors',
      connectorShape: 'crookedLine',
    },
  };
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: '#eee',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie',
      borderWidth: 0
    },
    title : {
      text: ''
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
      pie: {
        size: '50%',
        allowPointSelect: true,
        cursor: 'pointer'
      }
    },
    series : [this.series]
  };
  chartCallback: Highcharts.ChartCallbackFunction = function (){
    console.log();
  };

  constructor(
    @Inject(APP_CONFIG) appConfig: AppConfig,
    cds: CommunityDataService,
    paginationService: PaginationService,
    private cdr: ChangeDetectorRef
  ) {
    super(appConfig, cds, paginationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.communitiesRD$.subscribe(( (dataFetched) =>{

      if ( dataFetched.hasSucceeded ){
        this.communitiesList = dataFetched.payload.page;
        let newData: any[] = [];
        this.communitiesList.forEach((community: Community, index)=>{
          let itemsCount = Number(community.archivedItemsCount);
          let communityUrl = community.metadata['dc.identifier.uri'][0].value;
          let communityId = community.id;
          let communityName = community.metadata['dc.title'][0].value;
          newData.push(
            {name: communityName, y: itemsCount}
          );
          this.slides.push({
            itemsNumber: itemsCount,
            name: communityName,
            collectionUrl: communityId,
            communityColor: this.getRandomColor(),
          }
          );
          console.log(this.slides);
        });
        const total = newData.reduce((acc: number, point) => Number(acc) + point.y, 0);
        const thresholdAngle = 0.05 * 360; // 5% of 360 degrees
        newData.forEach(point => {
          const angle = (point.y / total) * 360;
          if (angle < thresholdAngle) {
            const newAngle = thresholdAngle;
            const newValue = Math.round((newAngle / 360) * total);
            const adjustment = newValue - point.y;
            // Adjust all other values proportionally
            const totalAdjusted = Number(total) + adjustment;
            const adjustmentRatio = total / totalAdjusted;
            newData.forEach(p => {
              if (p !== point) {
                p.y *= adjustmentRatio;
              }
            });
            point.y = newValue;
          }
        });
        // Round off y values to whole numbers
        newData.forEach(point => {
          point.y = Math.round(point.y);
        });
        if ('data' in this.chartOptions.series[0]) {
          let sortedData = newData.sort((a, b) => a.name.localeCompare(b.name));
          this.chartOptions.series[0].data = [...sortedData];
          this.updateFlag = true;
        }
        this.groupSlides();
      }
    }));
  }

  groupSlides(): void {
    this.groupedSlides = [];
    for (let i = 0; i < this.slides.length; i += 3) {
      this.groupedSlides.push(this.slides.slice(i, i + 3));
    }
  }

  private getRandomColor() {
    let colors: string[] = [
      'bright-red', // Bright Red
      'bright-green', // Bright Green
      'bright-blue', // Bright Blue
      'bright-pink', // Bright Pink
      'bright-yellow', // Bright Yellow
      'bright-cyan', // Bright Cyan
      'bright-purple', // Bright Purple
      'bright-orange'  // Bright Orange
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}

