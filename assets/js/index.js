window.onload = ()=>{
    
    const cateEvent = ((base, count)=>{
        const basePoint = base, countPoint = count
            , posts = Array.from(base.children).map( li=> {return {li, category: `#${li.getAttribute('category')}`}});
        return (e)=>{
            base.innerHTML = '';
            const cateName = e.target.textContent;
            let count = 0;
            posts.filter(v => cateName ==='#ALL'? true : v.category===cateName).forEach((v,i)=>{ count++; base.appendChild(v.li);});
            countPoint.textContent = `${count} Posts`;
        }
    })(document.querySelector('#post-list'), document.querySelector('#navbar h5'));
    
    const category = Array.from(document.querySelector('#category .content_section').getElementsByTagName('span'));
    category.forEach((div,i)=>{
        div.onclick = cateEvent;
    });
}