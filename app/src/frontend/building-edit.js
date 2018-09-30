import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ErrorBox from './error-box';
import InfoBox from './info-box';
import Sidebar from './sidebar';

class BuildingEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            building_id: props.building_id,
            revision_id: props.revision_id,
            geometry_id: props.geometry_id,
            location_name: props.location_name,
            location_number: props.location_number,
            location_line_two: props.location_line_two,
            location_street: props.location_street,
            location_postcode: props.location_postcode,
            date_year: props.date_year,
            date_lower: props.date_lower,
            date_upper: props.date_upper,
            date_source: props.date_source,
            facade_year: props.facade_year,
            facade_upper: props.facade_upper,
            facade_lower: props.facade_lower,
            facade_source: props.facade_source,
            size_storeys_attic: props.size_storeys_attic,
            size_storeys_core: props.size_storeys_core,
            size_storeys_basement: props.size_storeys_basement,
            likes_total: props.likes_total,
            liked: props.liked
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = (target.value === '')? null : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLike(event) {
        const liked = event.target.checked;
        const likes = this.state.likes || [];
        if (liked) {
            this.setState({
                likes: likes.concat([this.props.user.id]),
                liked: true
            });
        } else {
            this.setState({
                likes: likes.filter(id => id !== this.props.user.id),
                liked: false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({error: undefined})

        fetch(`/building/${this.props.building_id}.json`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                this.setState({error: res.error})
            } else {
                this.props.selectBuilding(this.state);  // could use server response?
                this.props.history.push(`/building/${this.props.building_id}.html`);
            }
        }.bind(this)).catch(
            (err) => this.setState({error: err})
        );
    }

    render() {
        if (!this.props.user){
            return <Redirect to="/sign-up.html" />
        }
        if (!this.props.building_id){
            return (
                <Sidebar title="Building Not Found">
                    <InfoBox msg="We can't find that one anywhere - try the map again?" />
                    <div className="buttons-container">
                        <Link to="/map/date_year.html" className="btn btn-secondary">Back to maps</Link>
                    </div>
                </Sidebar>
            );
        }
        return (
            <Sidebar title={`Edit Building`}>
                <form action="building-view.html" method="GET" onSubmit={this.handleSubmit}>

                    <ErrorBox msg={this.state.error} />

                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix location toggled-on">Location</legend>
                        <div id="data-list-location" className="data-list">

                            <label htmlFor="location_name">Building name</label>
                            <input className="form-control" type="text"
                                   id="location_name" name="location_name"
                                   value={this.state.location_name}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_number">Building number</label>
                            <input className="form-control" type="text"
                                   id="location_number" name="location_number"
                                   value={this.state.location_number}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_street">Street</label>
                            <input className="form-control" type="text"
                                   id="location_street" name="location_street"
                                   value={this.state.location_street}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_line_two">Address line 2</label>
                            <input className="form-control" type="text"
                                   id="location_line_two" name="location_line_two"
                                   value={this.state.location_line_two}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_town">Town</label>
                            <input className="form-control" type="text"
                                   id="location_town" name="location_town"
                                   value={this.state.location_town}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="location_postcode">Postcode</label>
                            <input className="form-control" type="text"
                                   id="location_postcode" name="location_postcode"
                                   value={this.state.location_postcode}
                                   onChange={this.handleChange}
                                   />

                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix age">Age</legend>
                        <div id="data-list-age" className="data-list">

                            <label htmlFor="date_year">Year built (best estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_year" name="date_year"
                                   value={this.state.date_year}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_upper">Year built (upper estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_upper" name="date_upper"
                                   value={this.state.date_upper}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_lower">Year built (lower estimate)</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_lower" name="date_lower"
                                   value={this.state.date_lower}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_facade">Facade date</label>
                            <input className="form-control" type="number" step="1"
                                   id="date_facade" name="date_facade"
                                   value={this.state.date_facade}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="date_source">Source</label>
                            <input className="form-control" type="text"
                                   id="date_source" name="date_source"
                                   value={this.state.date_source}
                                   onChange={this.handleChange}
                                   />
                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix size">Size</legend>
                        <div id="data-list-size" className="data-list">

                            <label htmlFor="size_storeys_attic">Attic storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_storeys_attic" name="size_storeys_attic"
                                   value={this.state.size_storeys_attic}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="size_storeys_core">Core storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_storeys_core" name="size_storeys_core"
                                   value={this.state.size_storeys_core}
                                   onChange={this.handleChange}
                                   />

                            <label htmlFor="size_storeys_basement">Basement storeys</label>
                            <input className="form-control" type="number" step="1"
                                   id="size_storeys_basement" name="size_storeys_basement"
                                   value={this.state.size_storeys_basement}
                                   onChange={this.handleChange}
                                   />
                        </div>
                    </fieldset>
                    <fieldset className="data-section">
                        <legend className="h3 bullet-prefix like">Like Me!</legend>
                        <div id="data-list-like" className="data-list">
                            <label htmlFor="likes">Like this building?</label>
                            <div className="form-check">
                                <input className="form-check-input position-static"
                                       type="checkbox"
                                       checked={this.state.liked}
                                       onChange={this.handleLike}
                                       />
                            </div>
                        </div>
                    </fieldset>
                    <div className="buttons-container">
                        <Link to={`/building/${this.props.building_id}.html`} className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Sidebar>
        );
    }
}

export default BuildingEdit;
