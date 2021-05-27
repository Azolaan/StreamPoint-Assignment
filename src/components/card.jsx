import React from "react"
import { Card, Button } from "antd"
import { EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons"

import "./card.css"

class CardComponent extends React.Component {
    handleEdit = () => {
        this.props.onEdit(this.props.id)
    }

    handleCopy = () => {
        this.props.onCopy(this.props.id)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id)
    }

    renderCardActions = () => {
        return (
            <div>
                <Button
                    className="action-button"
                    shape="circle"
                    type="link"
                    onClick={this.handleEdit}
                >
                    <EditOutlined className="action-button-icon" />
                </Button>
                <Button
                    className="action-button"
                    shape="circle"
                    type="link"
                    onClick={this.handleCopy}
                >
                    <CopyOutlined className="action-button-icon" />
                </Button>
                <Button
                    className="action-button"
                    shape="circle"
                    type="link"
                    onClick={this.handleDelete}
                    disabled={this.props.single}
                >
                    <DeleteOutlined className="action-button-icon" />
                </Button>
            </div>
        )
    }

    render() {
        return (
            <Card
                className="card-component"
                title={this.props.title}
                extra={this.renderCardActions()}
                headStyle={{
                    fontSize: this.props.titleSize,
                    color: this.props.titleColor,
                    padding: 0,
                    margin: "0 24px"
                }}
                style={{
                    borderRadius: this.props.borderRadius,
                    backgroundColor: this.props.backgroundColor,
                    color: this.props.bodyColor,
                    fontSize: this.props.bodySize
                }}
            >
                {this.props.body}
            </Card>
        )
    }
}

export default CardComponent
