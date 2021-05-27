import React from "react"
import {
    Drawer,
    Tabs,
    Form,
    Input,
    InputNumber,
    Typography,
    Divider,
    Popover
} from "antd"
import { SettingOutlined, FormatPainterOutlined } from "@ant-design/icons"
import { BlockPicker } from "react-color"

import "./drawer.css"

const { TabPane } = Tabs
const { Title, Text } = Typography

class DrawerComponent extends React.Component {
    state = {
        activeTab: "content"
    }

    handleChangeValues = (values) => {
        this.props.onChangeValues(this.props.card.id, values)
    }

    handleChangeTitleSize = (size) => {
        this.props.onChangeFormat(this.props.card.id, size, "titleSize")
    }

    handleChangeTitleColor = (color) => {
        this.props.onChangeFormat(this.props.card.id, color.hex, "titleColor")
    }

    handleChangeBodySize = (size) => {
        this.props.onChangeFormat(this.props.card.id, size, "bodySize")
    }

    handleChangeBodyColor = (color) => {
        this.props.onChangeFormat(this.props.card.id, color.hex, "bodyColor")
    }

    handleChangeBorderRadius = (size) => {
        this.props.onChangeFormat(this.props.card.id, size, "borderRadius")
    }

    handleChangeBackgroundColor = (color) => {
        this.props.onChangeFormat(
            this.props.card.id,
            color.hex,
            "backgroundColor"
        )
    }

    colorTitlePicker = () => {
        return (
            <BlockPicker
                color={this.props.card.titleColor}
                onChangeComplete={this.handleChangeTitleColor}
            />
        )
    }

    colorBodyPicker = () => {
        return (
            <BlockPicker
                color={this.props.card.bodyColor}
                onChangeComplete={this.handleChangeBodyColor}
            />
        )
    }

    colorBackgroundPicker = () => {
        return (
            <BlockPicker
                color={this.props.card.backgroundColor}
                onChangeComplete={this.handleChangeBackgroundColor}
            />
        )
    }

    handleChangeTab = (key) => {
        this.setState({ activeTab: key })
    }

    renderContentTab = () => {
        return this.props.editing ? (
            <TabPane
                tab={<SettingOutlined style={{ width: 147, fontSize: 20 }} />}
                key="content"
            >
                <Form
                    layout="vertical"
                    onValuesChange={this.handleChangeValues}
                    initialValues={{
                        title: this.props.card.title,
                        body: this.props.card.body
                    }}
                >
                    <Form.Item label="Title Text" name="title">
                        <Input placeholder="Enter custom title" />
                    </Form.Item>
                    <Form.Item label="Body Text" name="body">
                        <Input.TextArea placeholder="Enter custom text" />
                    </Form.Item>
                </Form>
            </TabPane>
        ) : null
    }

    renderFormatTab = () => {
        return this.props.editing ? (
            <TabPane
                tab={
                    <FormatPainterOutlined
                        style={{ width: 147, fontSize: 20 }}
                    />
                }
                key="format"
            >
                <Title level={5} style={{ color: "#00A3FF" }}>
                    Title
                </Title>
                <div className="format-form">
                    <div className="format-form-group">
                        <Text strong>Size</Text>
                        <InputNumber
                            className="format-form-size-input"
                            formatter={(val) => `${val}px`}
                            parser={(val) => val.replace("px", "")}
                            defaultValue={this.props.card.titleSize}
                            onChange={this.handleChangeTitleSize}
                        />
                    </div>
                    <div className="format-form-group">
                        <Text strong>Color</Text>
                        <Popover
                            placement="bottom"
                            content={this.colorTitlePicker}
                            trigger="click"
                        >
                            <div
                                className="color-picker"
                                style={{
                                    backgroundColor: this.props.card.titleColor
                                }}
                            ></div>
                        </Popover>
                    </div>
                </div>
                <Divider />
                <Title level={5} style={{ color: "#00A3FF" }}>
                    Body
                </Title>
                <div className="format-form">
                    <div className="format-form-group">
                        <Text strong>Size</Text>
                        <InputNumber
                            className="format-form-size-input"
                            formatter={(val) => `${val}px`}
                            parser={(val) => val.replace("px", "")}
                            defaultValue={this.props.card.bodySize}
                            onChange={this.handleChangeBodySize}
                        />
                    </div>
                    <div className="format-form-group">
                        <Text strong>Color</Text>
                        <Popover
                            placement="bottom"
                            content={this.colorBodyPicker}
                            trigger="click"
                        >
                            <div
                                className="color-picker"
                                style={{
                                    backgroundColor: this.props.card.bodyColor
                                }}
                            ></div>
                        </Popover>
                    </div>
                </div>
                <Divider />
                <Title level={5} style={{ color: "#00A3FF" }}>
                    Panel
                </Title>
                <div className="format-form">
                    <div className="format-form-group">
                        <Text strong>Size</Text>
                        <InputNumber
                            className="format-form-size-input"
                            formatter={(val) => `${val}px`}
                            parser={(val) => val.replace("px", "")}
                            defaultValue={this.props.card.borderRadius}
                            onChange={this.handleChangeBorderRadius}
                        />
                    </div>
                    <div className="format-form-group">
                        <Text strong>Color</Text>
                        <Popover
                            placement="bottom"
                            content={this.colorBackgroundPicker}
                            trigger="click"
                        >
                            <div
                                className="color-picker"
                                style={{
                                    backgroundColor:
                                        this.props.card.backgroundColor
                                }}
                            ></div>
                        </Popover>
                    </div>
                </div>
            </TabPane>
        ) : null
    }

    render() {
        return (
            <Drawer
                visible={this.props.editing}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                width={350}
                bodyStyle={{ padding: 0 }}
                destroyOnClose={true}
            >
                <Tabs
                    activeKey={this.state.activeTab}
                    onChange={this.handleChangeTab}
                    tabBarStyle={{ width: "100%" }}
                    size="large"
                    centered
                >
                    {this.renderContentTab()}
                    {this.renderFormatTab()}
                </Tabs>
            </Drawer>
        )
    }
}

export default DrawerComponent
