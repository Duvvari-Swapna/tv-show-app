import { Component, OnInit } from '@angular/core';
import { TvShowService } from 'src/app/services/tv-show.service';
import { ActivatedRoute } from '@angular/router';
import { IShow } from 'src/app/models/show';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {
  show: IShow;
  id: number;
  castList: Array<object> = [];
  crewList: Array<object> = [];

  constructor(private route: ActivatedRoute, private service: TvShowService, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['showId'];
    this.service.getShow(this.id).subscribe((response) => {
      this.show = response;
    });
    this.service.getCastDetails(this.id).subscribe(value => this.castList = value);
    this.service.getCrewDetails(this.id).subscribe(value => this.crewList = value);
  }

  goBack() {
    this.location.back();
  }

}
