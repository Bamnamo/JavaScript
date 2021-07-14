import React, {useEffect, useState} from "react";

const Info = () => {
    const [name, setName] = useState('');
    const [nickNmae, setNickName] = useState('');
    useEffect(() => {
        console.log('effect')
        console.log(name);
        return () => {
            console.log('cleanup');
            console.log(name);
        };
    }, [name]);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickName = e => {
        setNickName(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}/>
                <input value={nickNmae} onChange={onChangeNickName}/>
            </div>
            <div>
                <div>
                    <b>이름: </b>{name}
                </div>
                <div>
                    <b>닉네임: </b>{nickNmae}
                </div>
            </div>
        </div>
    );
};

export default Info;