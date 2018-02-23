import * as React from 'react';
import pnp from "sp-pnp-js";
import  { SearchQuery, SearchResults } from "sp-pnp-js";
import styles from './SearchReact.module.scss';
import { ISearchReactProps } from './ISearchReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SearchReact extends React.Component<ISearchReactProps, {}> {
  public render(): React.ReactElement<ISearchReactProps> {
    return (
      <div className={ styles.searchReact }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <Welcome/>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export interface IWelcomeState {
  searchResults: string;
}
export interface IWelcomeProps {
  
}

class Welcome extends React.Component<IWelcomeProps,IWelcomeState> {
  

  constructor(props,state) {
    super(props);

    this.state = {
      searchResults: 'hier komen straks de zoekresultaten'
    };
  }

 

  componentDidMount(): void {
    var keyword = "SharePoint";
    pnp.sp.search(keyword).then((result : SearchResults) => {
      var props = result.PrimarySearchResults;
      debugger;
      
       var propValue = "";
       var counter = 1;
       props.forEach(function(object) {
        propValue += counter++ +'. Title - ' +object.Title +"<br/>"+"Rank - " + object.Rank +"<br/>"+"File Type -  " + object.FileType+"<br/>"+ "Original Path - " +object.OriginalPath +"<br/>"+" Summary - "+ object.HitHighlightedSummary + "<br/>"+"<br/>";
       });
       this.setState((prevState: IWelcomeState): IWelcomeState => {
        prevState.searchResults= propValue
        return prevState;});
       }).catch(function(err) {
        console.log("Error: " + err);   
       });
  }

  render() {
    return <div><h1>Hello You</h1>en nu { this.state.searchResults}</div> ;
  }
}