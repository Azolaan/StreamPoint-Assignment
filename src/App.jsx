import React from "react"
import _, { slice } from "lodash"
import { PageHeader } from "antd"

import CardComponent from "./components/card"
import DrawerComponent from "./components/drawer"

import { generateUUID } from "./utils/uuid"
import logo from "./assets/logo.png"

import "./App.css"

class App extends React.Component {
    state = {
        cards: [
            {
                id: generateUUID(),
                title: "Custom Title",
                body: "Custom body text",
                titleSize: 36,
                titleColor: "#0E2748",
                bodySize: 16,
                bodyColor: "#4F4F4F",
                borderRadius: 16,
                backgroundColor: "#FFFFFF"
            }
        ],
        editing: false,
        editingID: null
    }

    handleOpenDrawer = (id) => {
        this.setState({ editing: true, editingID: id })
    }

    handleCloseDrawer = () => {
        this.setState({ editing: false })
    }

    handleCopyCard = (id) => {
        this.setState((state) => {
            let card = _.find(state.cards, { id })
            let index = _.indexOf(state.cards, card)
            return {
                cards: [
                    ..._.slice(state.cards, 0, index),
                    { ...card, id: generateUUID() },
                    ...slice(state.cards, index)
                ]
            }
        })
    }

    handleDeleteCard = (id) => {
        this.setState((state) => ({
            cards: _.reject(state.cards, { id })
        }))
    }

    handleEditValues = (id, values) => {
        this.setState((state) => {
            let cards = _.map(state.cards, (card) => {
                if (card.id === id) {
                    return { ...card, ...values }
                }
                return card
            })

            return { cards }
        })
    }

    handleEditFormat = (id, val, property) => {
        this.setState((state) => {
            let cards = _.map(state.cards, (card) => {
                if (card.id === id) {
                    return { ...card, [property]: val }
                }
                return card
            })

            return { cards }
        })
    }

    renderCards = () => {
        return _.map(this.state.cards, (card) => {
            return (
                <CardComponent
                    key={card.id}
                    onEdit={this.handleOpenDrawer}
                    onCopy={this.handleCopyCard}
                    onDelete={this.handleDeleteCard}
                    single={_.size(this.state.cards) === 1}
                    {...card}
                />
            )
        })
    }

    render() {
        return (
            <div className="app">
                <PageHeader
                    className="page-header"
                    title={<img className="logo" src={logo} alt="" />}
                />
                {this.renderCards()}
                {this.state.editingID ? (
                    <DrawerComponent
                        editing={this.state.editing}
                        onClose={this.handleCloseDrawer}
                        card={_.find(this.state.cards, {
                            id: this.state.editingID
                        })}
                        onChangeValues={this.handleEditValues}
                        onChangeFormat={this.handleEditFormat}
                    />
                ) : null}
            </div>
        )
    }
}

export default App
