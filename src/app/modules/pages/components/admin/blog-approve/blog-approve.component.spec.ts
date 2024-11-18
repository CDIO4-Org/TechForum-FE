import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogApproveComponent } from './blog-approve.component';

describe('BlogApproveComponent', () => {
  let component: BlogApproveComponent;
  let fixture: ComponentFixture<BlogApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
