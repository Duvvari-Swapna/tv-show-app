import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TvShowService } from './tv-show.service';
import { IShow } from '../models/show';
import { ISearchResult } from '../models/search-result';

describe('TvShowService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: TvShowService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TvShowService
            ]
        });
        // Instantaites HttpClient, HttpTestingController and TvShowService
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(TvShowService);
    });

    afterEach(() => {
        httpTestingController.verify(); // Verifies that no requests are outstanding.
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getAllShows', () => {
        let showsList: IShow[];

        beforeEach(() => {
            // Dummy data to be returned by request.
            showsList = [
                {
                    'id': 1,
                    'url': 'http://www.tvmaze.com/shows/1/under-the-dome',
                    'name': 'Under the Dome',
                    'type': 'Scripted',
                    'language': 'English',
                    'genres': [
                        'Drama',
                        'Science-Fiction',
                        'Thriller'
                    ],
                    'status': 'Ended',
                    'runtime': 60,
                    'premiered': '2013-06-24',
                    'officialSite': 'http://www.cbs.com/shows/under-the-dome/',
                    'schedule': {
                        'time': '22:00',
                        'days': [
                            'Thursday'
                        ]
                    },
                    'rating': {
                        'average': 6.5
                    },
                    'weight': 97,
                    'webChannel': null,
                    'image': {
                        'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
                        'original': 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
                    },
                    // tslint:disable-next-line: max-line-length
                    'summary': '<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome.</p>',
                    'updated': 1573667713,
                    '_links': {
                        'nextepisode': {
                            'href': 'http://api.tvmaze.com/shows/1'
                        },
                        'previousepisode': {
                            'href': 'http://api.tvmaze.com/episodes/185054'
                        }
                    }
                },
                {
                    'id': 2,
                    'url': 'http://www.tvmaze.com/shows/2/person-of-interest',
                    'name': 'Person of Interest',
                    'type': 'Scripted',
                    'language': 'English',
                    'genres': [
                        'Action',
                        'Crime',
                        'Science-Fiction'
                    ],
                    'status': 'Ended',
                    'runtime': 60,
                    'premiered': '2011-09-22',
                    'officialSite': 'http://www.cbs.com/shows/person_of_interest/',
                    'schedule': {
                        'time': '22:00',
                        'days': [
                            'Tuesday'
                        ]
                    },
                    'rating': {
                        'average': 8.9
                    },
                    'weight': 94,
                    'webChannel': null,
                    'image': {
                        'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
                        'original': 'http://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg'
                    },
                    // tslint:disable-next-line: max-line-length
                    'summary': '<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \'irrelevant\'. They would not act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You will never find us. But victim or perpetrator, if your number is up, we will find you.</p>',
                    'updated': 1588773151,
                    '_links': {
                        'nextepisode': {
                            'href': 'http://api.tvmaze.com/shows/2'
                        },
                        'previousepisode': {
                            'href': 'http://api.tvmaze.com/episodes/659372'
                        }
                    }
                }
            ] as IShow[];
        });

        // Test case 1
        it('should return expected shows list by calling once', () => {
            service.getAllShows().subscribe(
                list => expect(list).toEqual(showsList, 'should return expected showslist'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/shows`);
            expect(req.request.method).toEqual('GET');

            req.flush(showsList); // Return showsList
        });

        // Test case 2
        it('should be OK returning no shows', () => {
            service.getAllShows().subscribe(
                list => expect(list.length).toEqual(0, 'should have empty shows array'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/shows`);
            req.flush([]); // Return empty data
        });

        // Test case 3
        it('should turn 500 error into an empty showsList result', () => {
            service.getAllShows().subscribe(
                data => fail('Should have failed with 500 error'),
                (error: HttpErrorResponse) => {
                    expect(error.status).toEqual(500);
                    expect(error.error).toContain('Internal Server Error');
                }
            );
            const req = httpTestingController.expectOne(`${service.api}/shows`);
            const message = 'Internal Server Error';
            req.flush(message, { status: 500, statusText: 'Not Found' }); // Return error
        });

        // // Test case 4
        it('should return expected showsList when called multiple times', () => {
            service.getAllShows().subscribe();
            service.getAllShows().subscribe(
                list => expect(list).toEqual(showsList, 'should return expected showsList'),
                fail
            );

            const requests = httpTestingController.match(`${service.api}/shows`);
            expect(requests.length).toEqual(2, 'calls to getAllShows()');

            requests[0].flush([]); // Return Empty body for first call
            requests[1].flush(showsList); // Return expectedEmps in second call
        });
    });

    describe('#getShowsFromSearch', () => {
        let searchResults: ISearchResult[];

        beforeEach(() => {
            // Dummy data to be returned by request.
            searchResults = [
                {
                    'score': 13.907654,
                    'show': {
                        'id': 41332,
                        'url': 'http://www.tvmaze.com/shows/41332/the-good-lord-bird',
                        'name': 'The Good Lord Bird',
                        'type': 'Scripted',
                        'language': 'English',
                        'genres': [
                            'Drama',
                            'War'
                        ],
                        'status': 'In Development',
                        'runtime': 60,
                        'premiered': '2020-10-04',
                        'officialSite': 'https://www.sho.com/the-good-lord-bird',
                        'schedule': {
                            'time': '22:00',
                            'days': [
                                'Sunday'
                            ]
                        },
                        'rating': {
                            'average': null
                        },
                        'weight': 98,
                        'webChannel': null,
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/268/671010.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/268/671010.jpg'
                        },
                        // tslint:disable-next-line: max-line-length
                        'summary': '<p>Based on the National Book Award-winning novel by bestselling author James McBride, <b>The Good Lord Bird</b> is told from the point of view of Onion, an enslaved teenager who becomes a member in Brown\'s motley family during the time of Bleeding Kansas, eventually participating in the famous 1859 raid on the Army depot at Harpers Ferry. Brown\'s raid failed to initiate the slave revolt he intended, but was the instigating event that started the Civil War.</p>',
                        'updated': 1597567866,
                        '_links': {
                            'nextepisode': {
                                'href': 'http://api.tvmaze.com/shows/41332'
                            },
                            'previousepisode': {
                                'href': 'http://api.tvmaze.com/episodes/1863940'
                            }
                        }
                    }
                },
                {
                    'score': 15.67849,
                    'show': {
                        'id': 33352,
                        'url': 'http://www.tvmaze.com/shows/33352/the-lord-of-the-rings',
                        'name': 'The Lord of the Rings',
                        'type': 'Scripted',
                        'language': 'English',
                        'genres': [
                            'Drama',
                            'Adventure',
                            'Fantasy'
                        ],
                        'status': 'In Development',
                        'runtime': 60,
                        'premiered': null,
                        'officialSite': 'http://amazon.com/lotronprime',
                        'schedule': {
                            'time': '',
                            'days': [

                            ]
                        },
                        'rating': {
                            'average': null
                        },
                        'weight': 95,
                        'webChannel': null,
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/205/512528.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/205/512528.jpg'
                        },
                        // tslint:disable-next-line: max-line-length
                        'summary': '<p>Set in Middle Earth during the Second Age, the television adaptation will explore new storylines approximately 3,000 years before the events of J.R.R. Tolkien\'s <i>The Fellowship of the Ring</i>.</p>',
                        'updated': 1579043794,
                        '_links': {
                            'nextepisode': {
                                'href': 'http://api.tvmaze.com/shows/33352'
                            },
                            'previousepisode': {
                                'href': 'http://api.tvmaze.com/shows/33352'
                            }
                        }
                    }
                },
                {
                    'score': 17.498875,
                    'show': {
                        'id': 43660,
                        'url': 'http://www.tvmaze.com/shows/43660/the-grand-lord',
                        'name': 'The Grand Lord',
                        'type': 'Animation',
                        'language': 'Chinese',
                        'genres': [
                            'Action',
                            'Adventure',
                            'Anime',
                            'Fantasy'
                        ],
                        'status': 'Ended',
                        'runtime': 24,
                        'premiered': '2019-08-08',
                        'officialSite': 'https://www.iqiyi.com/a_19rrhsgm1t.html',
                        'schedule': {
                            'time': '08:00',
                            'days': [
                                'Thursday'
                            ]
                        },
                        'rating': {
                            'average': null
                        },
                        'weight': 34,
                        'webChannel': null,
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/209/524535.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/209/524535.jpg'
                        },
                        // tslint:disable-next-line: max-line-length
                        'summary': '<p>Many worlds intertwine and interact, but not all reach the top of at least one of the worlds. Martyr first of the world Bailing was lucky enough to get to the school of the Soul Path. The selection of disciples was made by the Measurement of Judgment only once every three years, and no disciple from the lower world had ever been so honored. The best graduates of this school can go to one of The five Great Universities. But having committed a bloody crime of Torment, he is expelled from school and returned to his native world in disgrace, where he has to start all over again to get a chance to enter one of the Great Universities. And the first step of a new path for him becomes contest schools West and East, winners which are taken to the primary school Tianze, where gifted warriors are trained.</p>',
                        'updated': 1591628040,
                        '_links': {
                            'nextepisode': {
                                'href': 'http://api.tvmaze.com/shows/43660'
                            },
                            'previousepisode': {
                                'href': 'http://api.tvmaze.com/episodes/1715711'
                            }
                        }
                    }
                },
                {
                    'score': 16.4386546,
                    'show': {
                        'id': 21029,
                        'url': 'http://www.tvmaze.com/shows/21029/lord-tramp',
                        'name': 'Lord Tramp',
                        'type': 'Scripted',
                        'language': 'English',
                        'genres': [
                            'Comedy'
                        ],
                        'status': 'Ended',
                        'runtime': 25,
                        'premiered': '1977-08-01',
                        'officialSite': null,
                        'schedule': {
                            'time': '16:00',
                            'days': [
                                'Monday'
                            ]
                        },
                        'rating': {
                            'average': null
                        },
                        'weight': 0,
                        'webChannel': null,
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/74/185550.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/74/185550.jpg'
                        },
                        // tslint:disable-next-line: max-line-length
                        'summary': '<p>Hughie Wagstaff is a penniless tramp who suddenly finds his life turned upside down when he is revealed as the heir to a title and a large estate - complete with stately home and servants. He finds his new life difficult to adjust to and can\'t help slipping in to his old ways, much to the consternation of his staff and snobby neighbours.</p>',
                        'updated': 1473697839,
                        '_links': {
                            'nextepisode': {
                                'href': 'http://api.tvmaze.com/shows/21029'
                            },
                            'previousepisode': {
                                'href': 'http://api.tvmaze.com/episodes/925008'
                            }
                        }
                    }
                },
                {
                    'score': 13.4548754,
                    'show': {
                        'id': 5403,
                        'url': 'http://www.tvmaze.com/shows/5403/flintoff-lord-of-the-fries',
                        'name': 'Flintoff: Lord of the Fries',
                        'type': 'Documentary',
                        'language': 'English',
                        'genres': [
                            'Adventure',
                            'Food',
                            'Travel'
                        ],
                        'status': 'Ended',
                        'runtime': 45,
                        'premiered': '2015-02-13',
                        'officialSite': null,
                        'schedule': {
                            'time': '20:00',
                            'days': [
                                'Tuesday'
                            ]
                        },
                        'rating': {
                            'average': null
                        },
                        'weight': 68,
                        'webChannel': null,
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/175/438471.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/175/438471.jpg'
                        },
                        // tslint:disable-next-line: max-line-length
                        'summary': '<p><b>Flintoff: Lord of the Fries</b> follows Freddie Flintoff and cyclist Rob Penn as they embark on a Summer adventure around England and Ireland in an eco-friendly chip van.</p>',
                        'updated': 1576973559,
                        '_links': {
                            'nextepisode': {
                                'href': 'http://api.tvmaze.com/shows/5403'
                            },
                            'previousepisode': {
                                'href': 'http://api.tvmaze.com/episodes/1013796'
                            }
                        }
                    }
                }
            ] as ISearchResult[];
        });

        // Test case 1
        it('should return expected shows list based on search item by calling once', () => {
            const query = 'girls';
            service.getShowsFromSearch(query).subscribe(
                list => expect(list).toEqual(searchResults, 'should return expected searchResults Array'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/search/shows?q=${query}`);
            expect(req.request.method).toEqual('GET');

            req.flush(searchResults); // Return searchResults
        });

        // Test case 2
        it('should be OK returning no search results', () => {
            const query = 'girls';
            service.getShowsFromSearch(query).subscribe(
                list => expect(list.length).toEqual(0, 'should have empty search results array'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/search/shows?q=${query}`);
            req.flush([]); // Return empty data
        });

        // Test case 3
        it('should turn 404 error into an empty search results array', () => {
            const query = 'girls';
            service.getShowsFromSearch(query).subscribe(
                data => fail('Should have failed with 404 error'),
                (error: HttpErrorResponse) => {
                    expect(error.status).toEqual(404);
                    expect(error.error).toContain('404 error');
                }
            );

            const req = httpTestingController.expectOne(`${service.api}/search/shows?q=${query}`);

            const message = '404 error';
            // req.error({ status: 404, statusText: 'Not Found' })
            req.flush(message, { status: 404, statusText: 'Not Found' }); // Return error
        });

        // // Test case 4
        it('should return expected search results when called multiple times', () => {
            const query = 'girls';
            service.getShowsFromSearch(query).subscribe();
            service.getShowsFromSearch(query).subscribe(
                list => expect(list).toEqual(searchResults, 'should return expected search results array'),
                fail
            );

            const requests = httpTestingController.match(`${service.api}/search/shows?q=${query}`);
            expect(requests.length).toEqual(2, 'calls to getShowsFromSearch(query)');

            requests[0].flush([]); // Return Empty body for first call
            requests[1].flush(searchResults); // Return searchResults in second call
        });
    });

    describe('#getShow', () => {
        let shows: IShow;

        beforeEach(() => {
            // Dummy data to be returned by request.
            shows = {
                'id': 139,
                'url': 'http://www.tvmaze.com/shows/139/girls',
                'name': 'Girls',
                'type': 'Scripted',
                'language': 'English',
                'genres': [
                    'Drama',
                    'Romance'
                ],
                'status': 'Ended',
                'runtime': 30,
                'premiered': '2012-04-15',
                'officialSite': 'http://www.hbo.com/girls',
                'schedule': {
                    'time': '22:00',
                    'days': [
                        'Sunday'
                    ]
                },
                'rating': {
                    'average': 6.7
                },
                'weight': 97,
                'webChannel': null,
                'image': {
                    'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
                    'original': 'http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
                },
                // tslint:disable-next-line: max-line-length
                'summary': '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
                'updated': 1577601053,
                '_links': {
                    'nextepisode': {
                        'href': 'http://api.tvmaze.com/shows/139'
                    },
                    'previousepisode': {
                        'href': 'http://api.tvmaze.com/episodes/1079686'
                    }
                }
            } as IShow;
        });

        // Test case 1
        it('should return expected show by id by calling once', () => {
            const id = 139;
            service.getShow(id).subscribe(
                show => expect(show).toEqual(shows, 'should return expected show'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/shows/${id}`);
            expect(req.request.method).toEqual('GET');

            req.flush(shows); // Return show that matches passed id
        });
    });

    describe('#getCastDetails', () => {
        let castList: Array<object>;

        beforeEach(() => {
            // Dummy data to be returned by request.
            castList = [
                {
                    'person': {
                        'id': 7,
                        'url': 'http://www.tvmaze.com/people/7/mackenzie-lintz',
                        'name': 'Mackenzie Lintz',
                        'country': {
                            'name': 'United States',
                            'code': 'US',
                            'timezone': 'America/New_York'
                        },
                        'birthday': '1996-11-22',
                        'deathday': null,
                        'gender': 'Female',
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/3/7816.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/3/7816.jpg'
                        },
                        '_links': {
                            'self': {
                                'href': 'http://api.tvmaze.com/people/7'
                            }
                        }
                    },
                    'character': {
                        'id': 7,
                        'url': 'http://www.tvmaze.com/characters/7/under-the-dome-norrie-calvert-hill',
                        'name': 'Norrie Calvert-Hill',
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/0/793.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/0/793.jpg'
                        },
                        '_links': {
                            'self': {
                                'href': 'http://api.tvmaze.com/characters/7'
                            }
                        }
                    },
                    'self': false,
                    'voice': false
                },
            ];
        });

        // Test case 1
        it('should return expected castList by id by calling once', () => {
            const id = 1;
            service.getCastDetails(id).subscribe(
                list => expect(list).toEqual(castList, 'should return expected castList'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/shows/${id}/cast`);
            expect(req.request.method).toEqual('GET');

            req.flush(castList); // Return castList that matches passed id
        });
    });

    describe('#getCrewDetails', () => {
        let crewList: Array<object>;

        beforeEach(() => {
            // Dummy data to be returned by request.
            crewList = [
                {
                    'type': 'Creator',
                    'person': {
                        'id': 15,
                        'url': 'http://www.tvmaze.com/people/15/stephen-king',
                        'name': 'Stephen King',
                        'country': {
                            'name': 'United States',
                            'code': 'US',
                            'timezone': 'America/New_York'
                        },
                        'birthday': '1947-09-21',
                        'deathday': null,
                        'gender': 'Male',
                        'image': {
                            'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/0/1813.jpg',
                            'original': 'http://static.tvmaze.com/uploads/images/original_untouched/0/1813.jpg'
                        },
                        '_links': {
                            'self': {
                                'href': 'http://api.tvmaze.com/people/15'
                            }
                        }
                    }
                },
            ];
        });

        // Test case 1
        it('should return expected crewList by id by calling once', () => {
            const id = 1;
            service.getCrewDetails(id).subscribe(
                list => expect(list).toEqual(crewList, 'should return expected crewList'),
                fail
            );

            const req = httpTestingController.expectOne(`${service.api}/shows/${id}/crew`);
            expect(req.request.method).toEqual('GET');

            req.flush(crewList); // Return crewList that matches passed id
        });
    });
});
