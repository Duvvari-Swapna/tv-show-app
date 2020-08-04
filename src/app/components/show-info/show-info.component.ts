import { Component, OnInit } from '@angular/core';
import { TvShowService } from 'src/app/services/tv-show.service';
import { ActivatedRoute } from '@angular/router';
import { IShow } from 'src/app/models/show';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.scss']
})
export class ShowInfoComponent implements OnInit {
  show: IShow;

  constructor(private route: ActivatedRoute, private service: TvShowService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['showId'];
    this.service.getShow(id).subscribe((response) => {
      this.show = response;
    });
  }

}
