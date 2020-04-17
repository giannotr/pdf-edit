import React, { useState, useEffect } from 'react';
import { unparseSelection } from '../../lib/parsers';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Input } from '../../theme/forms';

function SelectRange({
  onSubmit,
  selection,
  disabled,
  placeholder,
}) {
  const [value, setValue] = useState('');
  const [rangeCall, setRangeCall] = useState(false);

  useEffect(() => {
    setValue(unparseSelection(selection));
  }, [selection]);

  const handleSubmitRange = ({ key }) => {
    if(key === 'Enter'){
      onSubmit(value);
    };
  }

  return(
    <ClickAwayListener onClickAway={() => setRangeCall(false)}>
      <div>
        <Tooltip
          arrow
          placement="bottom-start"
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setRangeCall(false)}
          open={rangeCall}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Hit 'Enter' to confirm selection"
        >
          <div>
            <Input
              type="text"
              name="pages"
              label="Selected pages"
              placeholder={placeholder}
              value={value}
              onClick={() => setRangeCall(true)}
              onChange={e => setValue(e.target.value)}
              onKeyPress={handleSubmitRange}
              disabled={disabled}
            />
          </div>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}

export default SelectRange;
