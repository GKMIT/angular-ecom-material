import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  public menuData = [];
  constructor(private router: Router) { }

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#fff',
    fontColor: '#333',
    backgroundColor: '#fff',
    selectedListFontColor: 'rgb(62, 81, 181)',
  };


  selectedItem(event) {
    this.router.navigate([event.link]);
  }

  ngOnInit() {
    // dashboard
    this.menuData.push({
      label: 'Dashboard',
      link: '/',
      icon: 'dashboard'
    });


    //  user
    this.menuData.push({
      label: 'Users',
      icon: 'account_circle',
      items: [
        {
          label: 'User Groups',
          link: '/user-groups',
        },
        {
          label: 'Users',
          link: '/users',
        },
      ]
    });

    // catalog
    this.menuData.push({
      label: 'Catalog',
      icon: 'settings',
      items: [
        {
          label: 'Setting',
          link: '/setting',
        },
        {
          label: 'Banners',
          link: '/banners',
        },
        {
          label: 'Ratings',
          link: '/ratings',
        },
        {
          label: 'Types',
          link: '/types',
        },
      ]
    });

    // customers
    this.menuData.push({
      label: 'Customers',
      icon: 'people',
      items: [
        {
          label: 'Customers',
          link: '/customers',
        },
        {
          label: 'Customer Groups',
          link: '/customer-groups',
        },
        {
          label: 'Customer Wishlist',
          link: '/customer-wishlists',
        },
      ]
    });

    // informations
    this.menuData.push({
      label: 'Informations',
      icon: 'info',
      items: [
        {
          label: 'Contact',
          items: [
            {
              label: 'Contact Types',
              link: '/contact-types',
            },
            {
              label: 'Contacts',
              link: '/contacts',
            }
          ]
        },
        {
          label: 'Informations',
          link: '/informations',
        },
      ]
    });

    // location
    this.menuData.push({
      label: 'Location',
      icon: 'place',
      items: [
        {
          label: 'Countries',
          link: '/countries',
        },
        {
          label: 'Zones',
          link: '/zones',
        },
        {
          label: 'Cities',
          link: '/cities',
        },
        {
          label: 'Locations',
          link: '/locations',
        },
      ]
    });


    // offer
    this.menuData.push({
      label: 'Offers',
      icon: 'people',
      items: [
        {
          label: 'Coupons',
          link: '/coupons',
        }
      ]
    });


    // product
    this.menuData.push({
      label: 'Products',
      icon: 'business',
      items: [
        {
          label: 'Attribute',
          items: [
            {
              label: 'Attributes',
              link: '/attributes',
            },
            {
              label: 'Attribute Groups',
              link: '/attribute-groups',
            },
          ]
        },
        {
          label: 'Unit',
          items: [
            {
              label: 'Length Classes',
              link: '/length-classes',
            },
            {
              label: 'Weight Classes',
              link: '/weight-classes',
            },
          ]
        },
        {
          label: 'Tax',
          items: [
            {
              label: 'Tax Classes',
              link: '/tax-classes',
            },
            {
              label: 'Tax Rates',
              link: '/tax-rates',
            },
          ]
        },
        {
          label: 'Categories',
          link: '/categories',
        },
        {
          label: 'Manufactures',
          link: '/manufactures',
        },
        {
          label: 'Product',
          items: [
            {
              label: 'Products',
              link: '/products',
            },
            {
              label: 'Product Reviews',
              link: '/product-reviews',
            },
          ]
        },
      ]
    });

    // purchases
    this.menuData.push({
      label: 'Purchases',
      icon: 'business_center',
      items: [
        {
          label: 'Setup',
          items: [
            {
              label: 'Purchase Statuses',
              link: '/purchase-statuses',
            },
            {
              label: 'Purchase Types',
              link: '/purchase-types',
            },
          ]
        },
        {
          label: 'Vendor',
          items: [
            {
              label: 'Vendor group',
              link: '/vendor-groups',
            },
            {
              label: 'Vendors',
              link: '/vendors',
            },
          ]
        },
        {
          label: 'Purchases',
          link: '/purchases',
        }
      ]
    });


    // orders
    this.menuData.push({
      label: 'Orders',
      icon: 'add_shopping_cart',
      items: [
        {
          label: 'Setup',
          items: [
            {
              label: 'Order Statuses',
              link: '/order-statuses',
            },
            {
              label: 'Order Types',
              link: '/order-types',
            },
          ]
        },
        {
          label: 'Orders',
          link: '/orders',
        }
      ]
    });


    // stocks
    this.menuData.push({
      label: 'Stocks',
      icon: 'cached',
      items: [
        {
          label: 'Stock statuses',
          link: '/stock-statuses',
        },
        {
          label: 'Stocks',
          link: '/stocks',
        },
      ]
    });

    // reports
    this.menuData.push({
      label: 'Reports',
      icon: 'book',
      items: [
        {
          label: 'Sales Report',
          items: [
            {
              label: 'Total Sales',
              link: '/total-sales',
            },
            {
              label: 'Total Sales Day',
              link: '/total-sales-day',
            },
            {
              label: 'Total Sales Month',
              link: '/total-sales-month',
            },
            {
              label: 'Total Sales Year',
              link: '/total-sales-year',
            },
          ]
        }
      ]
    });


  }

}
