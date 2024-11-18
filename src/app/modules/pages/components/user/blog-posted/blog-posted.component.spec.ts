import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostedComponent } from './blog-posted.component';

describe('BlogPostedComponent', () => {
  let component: BlogPostedComponent;
  let fixture: ComponentFixture<BlogPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
