# SharePoint Framework Deploy CLI

The SharePoint Framework Deploy CLI is a command line interface tool that uploads a SPPKG file to a SharePoint tenant or site collection app catalog and deployes the contents of the SPPKG file to the site's client side assets library using a client ID and client secret.

## Prerequisites

A SharePoint Add-In registration that has been granted **full control** permissions at the **web** level on the site where the app catalog exists.

See [https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/register-sharepoint-add-ins](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/register-sharepoint-add-ins) for more information.

## Commands

### Deploy to tenant app catalog

```
spfx deploy tenant --siteUrl <URL to tenant app catalog site> --clientId <SharePoint Add-In registration client ID> --clientSecret <SharePoint Add-In registration client secret>
```

### Deploy to site collection app catalog

```
spfx deploy site --siteUrl <Site Collection URL> --clientId <SharePoint Add-In registration client ID> --clientSecret <SharePoint Add-In registration client secret>
```