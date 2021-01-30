import React, {useState, useEffect} from 'react';
import Preloader from '../preloader';
import './itemList.css';

export default function ItemList({getData, onItemSelected, renderItem, activeItem}) {
    
    const [itemList, updateList] = useState(range(1,6).map(i => ({id:i}))),
        //   [activeItem, setActiveItem] = useState(null),
          [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getData()
            .then((data) => {
                updateList(data);
                setLoading(false);
            });
    }, []); // Второй аргумент - как prevProps, но работает только с примитивами. Для массива мы передаем пустой массив,
            // это говорит хуку, что эффект нужно выполнить только при появлении и исчезновении компонента.

    useEffect(() => {
        console.log('activeItem', activeItem);
    })

    function renderItems(arr) {
        
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            const className = `list-group-item${activeItem === id ? ' active' : ''}`;
            return (
                <li 
                    key={id}
                    className={className}
                    onClick={() => {onItemSelected(id)}}>
                    {label}
                </li>
            );
        });
    }

    const items = renderItems(itemList);
    // console.log('items', items);
    return (
        <ul className="item-list list-group">
            {loading ? <Preloader/> : null}
            {items}
        </ul>
    );
};



//---------------------------------------------------
function range(start, end) {
    let res = [];
    for (let i = start; i <= end; i++) {
        res.push(i);
    }
    return res;
}