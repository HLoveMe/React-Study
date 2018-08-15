需要的框架为 
    https://github.com/gsdios/SDCycleScrollView
    https://github.com/rs/SDWebImage

<CycleScrollView style={{height:200}}
                                 imageUrls={ this.state.imgs }
                                 titlesGroup={ this.state.titles }
                                 direction= { Direction.Horizontal }
                                 select={(e)=>{
                                     console.log(e)
                                 }}
                                 scroll={ (index)=>{
                                       console.log(index)
                                 }}
                                 labelStyle={
                                    {
                                        titleLabelTextColor:'orange',
                                        titleLabelBackgroundColor:'yellow'
                                    }
                                 }
                                 PageControl={
                                    {
                                        showPageControl:false
                                    }
                                 }

                >
</CycleScrollView>