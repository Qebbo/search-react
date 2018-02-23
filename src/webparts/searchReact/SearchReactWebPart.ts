import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchReactWebPartStrings';
import SearchReact from './components/SearchReact';
import { ISearchReactProps } from './components/ISearchReactProps';

export interface ISearchReactWebPartProps {
  description: string;
}

export default class SearchReactWebPart extends BaseClientSideWebPart<ISearchReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISearchReactProps > = React.createElement(
      SearchReact,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  
}
