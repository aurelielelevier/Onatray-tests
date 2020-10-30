const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#fed330',
                          '@layout-header-background': '#fed330',
                          '@layout-body-background': '#fed330',
                          '@menu-item-active-bg': '#4b6584',
                          '@menu-item-color': '#4b6584',
                          '@menu-bg': '#fed330',
                          '@menu-highlight-color':'#4b6584',
                          '@menu-item-active-border-width': '4px',
                          '@btn-primary-color': '#4b6584',
                          '@text-color': 'black',
                          '@link-color': '#4b6584',
                          '@font-family' : 'Dosis'
                          
                        },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
