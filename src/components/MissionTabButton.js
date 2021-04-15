import React, { useState } from 'react';

import { Button, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';

const MissionTabButton = (props) => {
	const [ id, setID ] = useState(props.id);
	return (
		<OverlayTrigger
			placement="bottom"
			delay={{ show: 250, hide: 400 }}
			overlay={<Tooltip id="button-tooltip">{props.toolTipText}</Tooltip>}
		>
			<Button
				variant="primary"
				onClick={() => props.handleClick(props.id)}
				disabled={props.inProgress || props.disabled}
			>
				{props.inProgress ? (
					<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
				) : (
					props.icon
				)}
			</Button>
		</OverlayTrigger>
	);
};

export default MissionTabButton;
//props.buttonText
