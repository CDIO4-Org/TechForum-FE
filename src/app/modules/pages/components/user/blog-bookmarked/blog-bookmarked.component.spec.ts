import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBookmarkedComponent } from './blog-bookmarked.component';

describe('BlogBookmarkedComponent', () => {
  let component: BlogBookmarkedComponent;
  let fixture: ComponentFixture<BlogBookmarkedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogBookmarkedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBookmarkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
