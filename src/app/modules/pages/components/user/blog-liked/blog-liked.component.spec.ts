import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLikedComponent } from './blog-liked.component';

describe('BlogLikedComponent', () => {
  let component: BlogLikedComponent;
  let fixture: ComponentFixture<BlogLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
