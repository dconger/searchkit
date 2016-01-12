import {State} from "../state"
import {ImmutableQuery} from "../query/ImmutableQuery";
import {Accessor} from "./Accessor"

export class StatefulAccessor<T extends State<any>> extends Accessor {
  key:string
  urlKey:string
  state:T
  resultsState:T

  constructor(key, urlString?){
    super()
    this.key = key
    this.urlKey = urlString || key && key.replace(/\./g, "_")
  }

  onStateChange(oldState){

  }

  fromQueryObject(ob){
    let value = ob[this.urlKey]
    this.state = this.state.setValue(value)
  }

  getQueryObject(){
    let val = this.state.getValue()
    return (val) ? {
      [this.urlKey]:this.state.getValue()
    } : {}
  }

  setSearchkitManager(searchkit){
    super.setSearchkitManager(searchkit)
    this.setResultsState()
  }

  setResults(results){
    super.setResults(results)
    this.setResultsState()
  }

  setResultsState(){
    this.resultsState = this.state
  }

  resetState(){
    this.state = this.state.clear()
  }

}
