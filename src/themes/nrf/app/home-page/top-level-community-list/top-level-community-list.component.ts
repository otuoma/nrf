import {Component, Inject, OnInit} from '@angular/core';
import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
// import {Highcharts} from 'highcharts/modules/sunburst';
import HC_sunburst from 'highcharts/modules/sunburst';
import * as Highcharts from 'highcharts';
import {Community} from '../../../../../app/core/shared/community.model';
import {APP_CONFIG, AppConfig} from '../../../../../config/app-config.interface';
import {CommunityDataService} from '../../../../../app/core/data/community-data.service';
import {PaginationService} from '../../../../../app/core/pagination/pagination.service';

HC_sunburst(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

declare let require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'ds-top-level-community-list',
  templateUrl: './top-level-community-list.component.html'
})
export class TopLevelCommunityListComponent extends BaseComponent implements OnInit{
  public communitiesList: Community[];

  data: {name: string, y: number}[] = [];

  constructor(
    @Inject(APP_CONFIG) appConfig: AppConfig,
    cds: CommunityDataService,
    paginationService: PaginationService
  ) {
    super(appConfig, cds, paginationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.communitiesRD$.subscribe(( (dataFetched) =>{

      if ( dataFetched.hasSucceeded ){
        this.communitiesList = dataFetched.payload.page;
        this.communitiesList.forEach((community: Community, index)=>{
          let itemsCount = Number(community.archivedItemsCount);
          let communityUrl = community.metadata['dc.identifier.uri'][0].value;
          let communityName = community.metadata['dc.title'][0].value;

          this.data.push(
            { name: communityName, y: itemsCount }
          );
        });
        this.renderChart();
      }
    }));
  }

  renderChart(): void{
    let chart = Highcharts.chart('highcharts-container', {
        chart: {
          plotBackgroundColor: '#eee',
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: ''
        },
        series: [{
            name: '',
            type: 'pie',
            innerSize: '60%',
            data: this.data,
          }
        ]
    }, function (){
      console.log('');
      }
    );


  }
}

