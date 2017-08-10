module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      jquery: {
        src: [
          'vendor/jquery/dist/jquery.min.js'
        ],
        dest: 'dist/js/jquery.min.js'
      },
      uikit: {
        src: [
          'vendor/uikit/js/uikit.min.js',
          'vendor/uikit/js/components/slideshow.min.js',
          'vendor/uikit/js/components/slider.min.js',
          'vendor/uikit/js/components/grid.min.js',
          'vendor/uikit/js/core/modal.min.js',
          'vendor/uikit/js/core/toggle.min.js',
          'vendor/uikit/js/core/switcher.min.js',
          'vendor/uikit/js/components/sticky.min.js'
          /*'vendor/uikit/js/core/alert.min.js',
          'vendor/uikit/js/core/button.min.js',
          'vendor/uikit/js/core/core.min.js',
          'vendor/uikit/js/core/dropdown.min.js',
          'vendor/uikit/js/core/grid.min.js',
          'vendor/uikit/js/core/modal.min.js',
          'vendor/uikit/js/core/nav.min.js',
          'vendor/uikit/js/core/offcanvas.min.js',
          'vendor/uikit/js/core/scrollspy.min.js',
          'vendor/uikit/js/core/smooth-scroll.min.js',
          'vendor/uikit/js/core/switcher.min.js',
          'vendor/uikit/js/core/tab.min.js',
          'vendor/uikit/js/core/toggle.min.js',
          'vendor/uikit/js/core/touch.min.js',
          'vendor/uikit/js/core/utility.min.js',
          'vendor/uikit/js/components/accordion.min.js',
          'vendor/uikit/js/components/autocomplete.min.js',
          'vendor/uikit/js/components/datepicker.min.js',
          'vendor/uikit/js/components/form-password.min.js',
          'vendor/uikit/js/components/form-select.min.js',
          'vendor/uikit/js/components/grid-parallax.min.js',
          'vendor/uikit/js/components/grid.min.js',
          'vendor/uikit/js/components/htmleditor.min.js',
          'vendor/uikit/js/components/lightbox.min.js',
          'vendor/uikit/js/components/nestable.min.js',
          'vendor/uikit/js/components/notify.min.js',
          'vendor/uikit/js/components/pagination.min.js',
          'vendor/uikit/js/components/search.min.js',
          'vendor/uikit/js/components/slider.min.js',
          'vendor/uikit/js/components/slideset.min.js',
          'vendor/uikit/js/components/slideshow.min.js',
          'vendor/uikit/js/components/slideshow-fx.min.js',
          'vendor/uikit/js/components/sortable.min.js',
          'vendor/uikit/js/components/sticky.min.js',
          'vendor/uikit/js/components/timepicker.min.js',
          'vendor/uikit/js/components/tooltip.min.js',
          'vendor/uikit/js/components/upload.min.js'*/
        ],
        dest: 'dist/js/uikit.min.js',
      }
      
    },
    sass: {
      options: {
  			sourceMap: true
  		},
      dist: {
        files: {
          'dist/css/uikit.css' : 'src/scss/uikit.scss',
          'dist/css/style.css' : 'src/scss/style.scss'
        }
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'dist/modal.html': ['src/pug/modal.pug'],
          'dist/index.html': ['src/pug/index.pug'],
          'dist/product-detail.html': ['src/pug/product-detail.pug'],
          'dist/product-list.html': ['src/pug/product-list.pug'],
          'dist/account-orders.html': ['src/pug/account-orders.pug'],
          'dist/account-address.html': ['src/pug/account-address.pug'],
          'dist/account-info.html': ['src/pug/account-info.pug'],
          'dist/reseller-application.html': ['src/pug/reseller-application.pug'],
          'dist/previous-order-summary.html': ['src/pug/previous-order-summary.pug'],
          'dist/basket.html': ['src/pug/basket.pug'],
          'dist/basket-2.html': ['src/pug/basket-2.pug'],
          'dist/basket-3.html': ['src/pug/basket-3.pug'],
          'dist/basket-4.html': ['src/pug/basket-4.pug']
        }
      }
    },
    autoprefixer:{
      dist:{
        files:{
          'dist/css/style.css':'dist/css/style.css'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      html: {
        files: '**/*.pug',
        tasks: ['pug']
      }
    }
  });

  grunt.registerTask('default', ['watch']);

};
