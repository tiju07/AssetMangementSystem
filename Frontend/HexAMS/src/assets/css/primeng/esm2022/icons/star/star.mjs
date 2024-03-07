import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class StarIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: StarIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: StarIcon, isStandalone: true, selector: "StarIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    d="M10.9741 13.6721C10.8806 13.6719 10.7886 13.6483 10.7066 13.6033L7.00002 11.6545L3.29345 13.6033C3.19926 13.6539 3.09281 13.6771 2.98612 13.6703C2.87943 13.6636 2.77676 13.6271 2.6897 13.5651C2.60277 13.5014 2.53529 13.4147 2.4948 13.3148C2.45431 13.215 2.44241 13.1058 2.46042 12.9995L3.17881 8.87264L0.167699 5.95324C0.0922333 5.8777 0.039368 5.78258 0.0150625 5.67861C-0.00924303 5.57463 -0.00402231 5.46594 0.030136 5.36477C0.0621323 5.26323 0.122141 5.17278 0.203259 5.10383C0.284377 5.03488 0.383311 4.99023 0.488681 4.97501L4.63087 4.37126L6.48797 0.618832C6.54083 0.530159 6.61581 0.456732 6.70556 0.405741C6.79532 0.35475 6.89678 0.327942 7.00002 0.327942C7.10325 0.327942 7.20471 0.35475 7.29447 0.405741C7.38422 0.456732 7.4592 0.530159 7.51206 0.618832L9.36916 4.37126L13.5114 4.97501C13.6167 4.99023 13.7157 5.03488 13.7968 5.10383C13.8779 5.17278 13.9379 5.26323 13.9699 5.36477C14.0041 5.46594 14.0093 5.57463 13.985 5.67861C13.9607 5.78258 13.9078 5.8777 13.8323 5.95324L10.8212 8.87264L11.532 12.9995C11.55 13.1058 11.5381 13.215 11.4976 13.3148C11.4571 13.4147 11.3896 13.5014 11.3027 13.5651C11.2059 13.632 11.0917 13.6692 10.9741 13.6721ZM7.00002 10.4393C7.09251 10.4404 7.18371 10.4613 7.2675 10.5005L10.2098 12.029L9.65193 8.75036C9.6368 8.6584 9.64343 8.56418 9.6713 8.47526C9.69918 8.38633 9.74751 8.30518 9.81242 8.23832L12.1969 5.94559L8.90298 5.45648C8.81188 5.44198 8.72555 5.406 8.65113 5.35152C8.57671 5.29703 8.51633 5.2256 8.475 5.14314L7.00002 2.1626L5.52503 5.15078C5.4837 5.23324 5.42332 5.30467 5.3489 5.35916C5.27448 5.41365 5.18815 5.44963 5.09705 5.46412L1.80318 5.94559L4.18761 8.23832C4.25252 8.30518 4.30085 8.38633 4.32873 8.47526C4.3566 8.56418 4.36323 8.6584 4.3481 8.75036L3.7902 12.0519L6.73253 10.5234C6.81451 10.4762 6.9058 10.4475 7.00002 10.4393Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: StarIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'StarIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    d="M10.9741 13.6721C10.8806 13.6719 10.7886 13.6483 10.7066 13.6033L7.00002 11.6545L3.29345 13.6033C3.19926 13.6539 3.09281 13.6771 2.98612 13.6703C2.87943 13.6636 2.77676 13.6271 2.6897 13.5651C2.60277 13.5014 2.53529 13.4147 2.4948 13.3148C2.45431 13.215 2.44241 13.1058 2.46042 12.9995L3.17881 8.87264L0.167699 5.95324C0.0922333 5.8777 0.039368 5.78258 0.0150625 5.67861C-0.00924303 5.57463 -0.00402231 5.46594 0.030136 5.36477C0.0621323 5.26323 0.122141 5.17278 0.203259 5.10383C0.284377 5.03488 0.383311 4.99023 0.488681 4.97501L4.63087 4.37126L6.48797 0.618832C6.54083 0.530159 6.61581 0.456732 6.70556 0.405741C6.79532 0.35475 6.89678 0.327942 7.00002 0.327942C7.10325 0.327942 7.20471 0.35475 7.29447 0.405741C7.38422 0.456732 7.4592 0.530159 7.51206 0.618832L9.36916 4.37126L13.5114 4.97501C13.6167 4.99023 13.7157 5.03488 13.7968 5.10383C13.8779 5.17278 13.9379 5.26323 13.9699 5.36477C14.0041 5.46594 14.0093 5.57463 13.985 5.67861C13.9607 5.78258 13.9078 5.8777 13.8323 5.95324L10.8212 8.87264L11.532 12.9995C11.55 13.1058 11.5381 13.215 11.4976 13.3148C11.4571 13.4147 11.3896 13.5014 11.3027 13.5651C11.2059 13.632 11.0917 13.6692 10.9741 13.6721ZM7.00002 10.4393C7.09251 10.4404 7.18371 10.4613 7.2675 10.5005L10.2098 12.029L9.65193 8.75036C9.6368 8.6584 9.64343 8.56418 9.6713 8.47526C9.69918 8.38633 9.74751 8.30518 9.81242 8.23832L12.1969 5.94559L8.90298 5.45648C8.81188 5.44198 8.72555 5.406 8.65113 5.35152C8.57671 5.29703 8.51633 5.2256 8.475 5.14314L7.00002 2.1626L5.52503 5.15078C5.4837 5.23324 5.42332 5.30467 5.3489 5.35916C5.27448 5.41365 5.18815 5.44963 5.09705 5.46412L1.80318 5.94559L4.18761 8.23832C4.25252 8.30518 4.30085 8.38633 4.32873 8.47526C4.3566 8.56418 4.36323 8.6584 4.3481 8.75036L3.7902 12.0519L6.73253 10.5234C6.81451 10.4762 6.9058 10.4475 7.00002 10.4393Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9pY29ucy9zdGFyL3N0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNCbEQsTUFBTSxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBQ2xDLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLFFBQVE7MkZBQVIsUUFBUSwyRkFoQlA7Ozs7Ozs7Ozs7Ozs7O0tBY1Q7OzJGQUVRLFFBQVE7a0JBcEJwQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0tBY1Q7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VJY29uIH0gZnJvbSAncHJpbWVuZy9iYXNlaWNvbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1N0YXJJY29uJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtCYXNlSWNvbl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE0IDE0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJhcmlhSGlkZGVuXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgW2NsYXNzXT1cImdldENsYXNzTmFtZXMoKVwiPlxuICAgICAgICAgICAgPGcgW2F0dHIuY2xpcC1wYXRoXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMTAuOTc0MSAxMy42NzIxQzEwLjg4MDYgMTMuNjcxOSAxMC43ODg2IDEzLjY0ODMgMTAuNzA2NiAxMy42MDMzTDcuMDAwMDIgMTEuNjU0NUwzLjI5MzQ1IDEzLjYwMzNDMy4xOTkyNiAxMy42NTM5IDMuMDkyODEgMTMuNjc3MSAyLjk4NjEyIDEzLjY3MDNDMi44Nzk0MyAxMy42NjM2IDIuNzc2NzYgMTMuNjI3MSAyLjY4OTcgMTMuNTY1MUMyLjYwMjc3IDEzLjUwMTQgMi41MzUyOSAxMy40MTQ3IDIuNDk0OCAxMy4zMTQ4QzIuNDU0MzEgMTMuMjE1IDIuNDQyNDEgMTMuMTA1OCAyLjQ2MDQyIDEyLjk5OTVMMy4xNzg4MSA4Ljg3MjY0TDAuMTY3Njk5IDUuOTUzMjRDMC4wOTIyMzMzIDUuODc3NyAwLjAzOTM2OCA1Ljc4MjU4IDAuMDE1MDYyNSA1LjY3ODYxQy0wLjAwOTI0MzAzIDUuNTc0NjMgLTAuMDA0MDIyMzEgNS40NjU5NCAwLjAzMDEzNiA1LjM2NDc3QzAuMDYyMTMyMyA1LjI2MzIzIDAuMTIyMTQxIDUuMTcyNzggMC4yMDMyNTkgNS4xMDM4M0MwLjI4NDM3NyA1LjAzNDg4IDAuMzgzMzExIDQuOTkwMjMgMC40ODg2ODEgNC45NzUwMUw0LjYzMDg3IDQuMzcxMjZMNi40ODc5NyAwLjYxODgzMkM2LjU0MDgzIDAuNTMwMTU5IDYuNjE1ODEgMC40NTY3MzIgNi43MDU1NiAwLjQwNTc0MUM2Ljc5NTMyIDAuMzU0NzUgNi44OTY3OCAwLjMyNzk0MiA3LjAwMDAyIDAuMzI3OTQyQzcuMTAzMjUgMC4zMjc5NDIgNy4yMDQ3MSAwLjM1NDc1IDcuMjk0NDcgMC40MDU3NDFDNy4zODQyMiAwLjQ1NjczMiA3LjQ1OTIgMC41MzAxNTkgNy41MTIwNiAwLjYxODgzMkw5LjM2OTE2IDQuMzcxMjZMMTMuNTExNCA0Ljk3NTAxQzEzLjYxNjcgNC45OTAyMyAxMy43MTU3IDUuMDM0ODggMTMuNzk2OCA1LjEwMzgzQzEzLjg3NzkgNS4xNzI3OCAxMy45Mzc5IDUuMjYzMjMgMTMuOTY5OSA1LjM2NDc3QzE0LjAwNDEgNS40NjU5NCAxNC4wMDkzIDUuNTc0NjMgMTMuOTg1IDUuNjc4NjFDMTMuOTYwNyA1Ljc4MjU4IDEzLjkwNzggNS44Nzc3IDEzLjgzMjMgNS45NTMyNEwxMC44MjEyIDguODcyNjRMMTEuNTMyIDEyLjk5OTVDMTEuNTUgMTMuMTA1OCAxMS41MzgxIDEzLjIxNSAxMS40OTc2IDEzLjMxNDhDMTEuNDU3MSAxMy40MTQ3IDExLjM4OTYgMTMuNTAxNCAxMS4zMDI3IDEzLjU2NTFDMTEuMjA1OSAxMy42MzIgMTEuMDkxNyAxMy42NjkyIDEwLjk3NDEgMTMuNjcyMVpNNy4wMDAwMiAxMC40MzkzQzcuMDkyNTEgMTAuNDQwNCA3LjE4MzcxIDEwLjQ2MTMgNy4yNjc1IDEwLjUwMDVMMTAuMjA5OCAxMi4wMjlMOS42NTE5MyA4Ljc1MDM2QzkuNjM2OCA4LjY1ODQgOS42NDM0MyA4LjU2NDE4IDkuNjcxMyA4LjQ3NTI2QzkuNjk5MTggOC4zODYzMyA5Ljc0NzUxIDguMzA1MTggOS44MTI0MiA4LjIzODMyTDEyLjE5NjkgNS45NDU1OUw4LjkwMjk4IDUuNDU2NDhDOC44MTE4OCA1LjQ0MTk4IDguNzI1NTUgNS40MDYgOC42NTExMyA1LjM1MTUyQzguNTc2NzEgNS4yOTcwMyA4LjUxNjMzIDUuMjI1NiA4LjQ3NSA1LjE0MzE0TDcuMDAwMDIgMi4xNjI2TDUuNTI1MDMgNS4xNTA3OEM1LjQ4MzcgNS4yMzMyNCA1LjQyMzMyIDUuMzA0NjcgNS4zNDg5IDUuMzU5MTZDNS4yNzQ0OCA1LjQxMzY1IDUuMTg4MTUgNS40NDk2MyA1LjA5NzA1IDUuNDY0MTJMMS44MDMxOCA1Ljk0NTU5TDQuMTg3NjEgOC4yMzgzMkM0LjI1MjUyIDguMzA1MTggNC4zMDA4NSA4LjM4NjMzIDQuMzI4NzMgOC40NzUyNkM0LjM1NjYgOC41NjQxOCA0LjM2MzIzIDguNjU4NCA0LjM0ODEgOC43NTAzNkwzLjc5MDIgMTIuMDUxOUw2LjczMjUzIDEwLjUyMzRDNi44MTQ1MSAxMC40NzYyIDYuOTA1OCAxMC40NDc1IDcuMDAwMDIgMTAuNDM5M1pcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGNsaXBQYXRoIFtpZF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN0YXJJY29uIGV4dGVuZHMgQmFzZUljb24ge1xuICAgIHBhdGhJZDogc3RyaW5nO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGF0aElkID0gJ3VybCgjJyArIFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnKSc7XG4gICAgfVxufVxuIl19