import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VotePollService } from '../vote-poll.service';

@Component({
  selector: 'app-resutl-display',
  templateUrl: './resutl-display.component.html',
  styleUrls: ['./resutl-display.component.css']
})
export class ResutlDisplayComponent implements OnInit {

  public name = '';
  public creator = '';
  public question = '';
  public options = [];
  public code = '';
  public data = [];

  constructor(private votePoll: VotePollService) {
    this.name = this.votePoll.pollname;
    this.creator = this.votePoll.creator;
    this.question = this.votePoll.question;
    this.options = this.votePoll.options;
    this.code = this.votePoll.code;
  }
  view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Votes';
  showYAxisLabel = true;
  yAxisLabel = 'Options';

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  //pie
  showLabels = true;

  ngOnInit(): void {
    this.data = this.options.map( option => {
      return {
        "name": option[0],
        "value": option[1].length
      };
    });
    console.log(this.data);
  }
}
