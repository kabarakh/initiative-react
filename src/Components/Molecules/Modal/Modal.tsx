import {Component, createRef, Fragment} from 'react';
import ReactDOM from 'react-dom';

interface Props {
    isOpen?: boolean;
    children: JSX.Element | JSX.Element[];
    confirmButtonText: string;
    cancelButtonText?: string;
    allowEscToClose?: boolean;
    onConfirmHandler?: (data?: any) => void;
    onCancelHandler?: (data?: any) => void;
    footerContent?: JSX.Element;
    additionalFooterClass?: string;
}

export class Modal extends Component<Props> {

    static defaultProps = {
        confirmButtonText: 'Close'
    };
    modalRef = createRef<HTMLDivElement>();
    modalElement = document.createElement('div');
    fallbackFooterContent: JSX.Element = (
        <Fragment>
            {this.props.onCancelHandler ?
                <button id="react-modal-button-cancel"
                        onClick={this.props.onCancelHandler}>{this.props.cancelButtonText}</button>
                : ''
            }
            {this.props.onConfirmHandler ?
                <button id="react-modal-button-confirm"
                        onClick={this.props.onConfirmHandler}>{this.props.confirmButtonText}</button>
                : ''
            }
        </Fragment>
    );

    constructor(props: Props) {
        super(props);

        if (props.onConfirmHandler === undefined && props.footerContent === undefined && props.onCancelHandler === undefined) {
            const modalException = {
                message: 'Either footerContent, onConfirmHandler or onCancelHandler has to be set for Modal',
                code: 1568211826,
            };
            throw JSON.stringify(modalException);
        }
    }

    componentDidMount() {
        document.body.appendChild(this.modalElement);

        document.onkeydown = (event: KeyboardEvent) => {
            if (event.code === 'Escape' && this.props.allowEscToClose === true && this.props.onCancelHandler !== undefined) {
                this.props.onCancelHandler('escape pressed');
            }
        };
    }

    componentWillUnmount() {
        document.body.removeChild(this.modalElement);
    }

    render() {
        return ReactDOM.createPortal(
            <div className={'react-modal-container' + (this.props.isOpen ? ' open' : '')}>
                <div className={'react-modal-backdrop'}/>
                <div className={'react-modal'} ref={this.modalRef}>
                    {this.props.children}
                    <div
                        className={this.props.additionalFooterClass ? this.props.additionalFooterClass + ' modal-footer' : 'modal-footer'}>
                        {this.props.footerContent || this.fallbackFooterContent}
                    </div>
                </div>
            </div>, this.modalElement
        );
    }
}
