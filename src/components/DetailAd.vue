<template>
    <div v-if="token" class="card is-clearfix columns">
        <div class="card-content__title mt-4">
            <h2 class="title is-4">{{list.title}}</h2>
        </div> 
        <div class="row">
            <div class="col-7">
              <b-carousel id="carousel-1" v-model="slide"  controls   indicators  :value=0   style="text-shadow: 1px 1px 2px #333;" >
                <b-carousel-slide v-for="(a,i) in medias" v-bind:key="i"  >
                  <template #img>
                    <img   class="d-block img-fluid w-100" :src="a.url" alt="image slot">
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <div class="col-5">
                <div class="card-content__text"><p class="description">Description</p><p>{{list.description}}</p></div> 
                <span class="title is-3"><strong v-if="list.price==0"> Gratuit</strong>
                <strong v-else>{{list.price}} € </strong></span>
                <div class="card-content__text"><p>Lieu <i class="fa fa-map-marker" aria-hidden="true"></i> 
                </p><Map :srcMap="location" /></div> 
              </div>
          </div>

        <div class="card-content__price is-pulled-left">
            <div class="ajout"><p>Ajouté par <a href="#"> {{seller.firstname}} </a> </p></div> 
            <button class="btn">Contactez ce vendeur</button> 
        </div>

    </div>
    <div v-else>Veuillez vous connecter pour voir cette page</div>

</template>



<script>
import { mapGetters } from "vuex"
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Map from './Map.vue'

let token = localStorage.getItem('token')

export default {
  name: "DetailAd",
  components: {
    Map,

  },
  data(){
    return {
      token:token,
      ad: [],
      category:[],
      campus:[],
      medias:[],
      adsCampus:[],
      photo:"",
      list:[],
      title:"",
      location:"",
      firstname:"",
      slide:"",
      sliding:""
     }

  },

  computed:{
    ...mapGetters(['user'])
  },  async mounted() {

      let id=this.$route.params.id;
            try {
        await fetch("http://localhost:8000/ads/"+id, {
          method: "GET"
        }).then(response => response.json()).then((response)=>{
                console.log(response)
                response.campus.forEach(e=>e.fields["id"]=e.pk);
                this.campus= response.campus.map(e=>e.fields);
                response.category.forEach(e=>e.fields["id"]=e.pk);
                this.category=response.category.map(e=>e=e.fields)[0];
                response.medias.forEach(e=>e.fields["id"]=e.pk);
                this.medias=response.medias.map(e=>e=e.fields);
                this.adsCampus=response.adsCampus.map(e=>e=e.fields);
                response.ads.forEach(e=>e.fields["id"]=e.pk);
                this.list=response.ads.map(e=>e=e.fields)
                this.list.forEach(e=>e['category']=this.category.categoryName)
                response.seller.forEach(e=>e.fields["id"]=e.pk);
                this.seller=response.seller.map(e=>e=e.fields);
                 console.log(this)
                this.list=this.list[0]
                this.seller=this.seller[0]
                this.location=response.location
                this.medias=this.getMedia(1)
                 
            
        })
      } catch (e) {
        this.error = "Une erreur est survenue!";
      }
  },methods:{
 
     onSlideStart(slide) {
         console.log(slide)
        this.sliding = true
      },
      onSlideEnd(slide) {
          console.log(slide)
        this.sliding = false
      }
    ,
      getMedia(){

        //   return["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTExYTEw8WFhYWFhcWFhYWGBYWFhkWFhcXFxYWFhYZHikhGRsmHhcWIjIiJiosLy8vGCA1OjUuOSkuLywBCgoKDg0OGxAQHC4mHh4uLi4uLi4sLi4uLi4uLi4uLi4uLi4uLi4uLjAwLi4uLi4sLi4uLi4uLi4uLi4uLi4uLv/AABEIANIA8AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYCBAUDBwj/xABLEAABAwEDAwwOCAUFAQAAAAABAAIRAwQSIQUGMRMWQVFSU1RhkaKx0RQiIzIzcXKBkpOho9LiFSQ0c4PBwvBCVWTT4URWgrKzY//EABoBAQEAAwEBAAAAAAAAAAAAAAABAgMEBQb/xAA1EQACAQIBCAkBCQEAAAAAAAAAAQIDERIEEyExQVFxkRQzUmGBobHR8DQFFSMyQmKSweEi/9oADAMBAAIRAxEAPwC4oimF9AfHBCoQILhSihAERSUAUIpQpACKSoQgQBSAoKAkqEClAFCIgClFCFBRSEQEFEQIQBShUIUIpUFCAoikBAFEoiALM4fvYTR41iVNZlq4kIiKmIUtE4BQs6LoMn9yIUZVpZlqHGDy8gMQV5LabtAyTAAxM6AIGxtrZdkWucbgxx74LXnFH8zN+ZlP8kW+CbOYgXS+g6+5HpBDkOvuR6QTP0u0uZOi1+xLkzmypXS+g6+5HpBS3Ilbcj0gp0il2lzKslr9iXJnOACxJXSORK+5HpBPoOvuR6QUVal2lzK8mrbIS/izmIF0/oOtuR6QT6Dr7kekFekUu0uZj0Wv2Jcmcxeoo7ZA5TywMFu/Qdfcj0gth2Sas96BjPfDi5dCjrw2SXMzjklXbB8mcZzYMKF1auRqxPeD0htk/msPoOvuR6QVVentkuZi8lrX0QlyZzQpJXS+g6+5HpBR9B19yPSCufpdpcx0Wv2Jcmc1ZNC6AyHW3I9ILxtthqMgvbAOAIIInjhM9CTspLmR5PVgsUou3emajioRFtNN7hJREIFkCoUIVOwQKUQWNe32+nRbL3ROgDEnxBcGtnvZWmIqk7MNZ8a0s8HnVtOikI5xVMyVZm1HEOmA2dMbIH5rjqV5RbtsPUo5HTdJTlfTpL6M/LNvdf0Wf3FOvuzb3W9Fv9xVU5KpbR5V7Usj0rrzB0HZO0tSyx/EOjZP+4uWbeetnrWqlSY2ree4AEtaBME49vxL6yvz5mVYGNt1ncAZFUEY8RX3fsh3EufKKmOSfcejklOFOLUL69vA3EWn2Q7iTsh3EtB1XNxcrOOrVZZqzqM6oGEtgXiDskDZIEkDiWz2Q7iTsh3Eguil1LdVIe2zWuo+nqtmbSqvJd3V5eKjC4gFzMKZI2LxHEPawZwEVKVSvVdTY6raw5tQ4Nu6ncY7yZcB51buyHcSdkO4lliRCo2jKVoFWWPe65abSTTxN+lTZTcaYHkl93jheGTMpvNayipaTDrNZ3dtWdTv1HVKoJDQ06o4w0EEhXXsh3EnZDuJMQOTa6TuzqbRWqhjqNSqWB5DL1N9FrRd3JDnSNmVW8m5SqOsZebYG1JpXy6vUPay4lrnXPq5dBEidAxV67IdxJ2Q7iRSBWLFUdVqWN2q2hgqU6rnsdUOJo6mGkwACDJMwLwIKua0+yHcS8rRlDU2lzyAB+4A2SsZSSV3qQxJaWdFFzrLb9UaHtOB4o0GCvXsh3EpGSkk1qYUk1dajbAXLzj8CfG3pWz2Q7iXPy5VJpOB4ulbaPWR4mnKn+BPg/QrgUFEXuHywUooQoRFKECKEQXKZngO7fhj9SqeQj258j8wrZnie7fhD9SqWQe/Pkfm1eZX1yPfp/TR4L+jurbDYpnySfYVrNbK3bQO0d5J6FyHNLYeOZ5+uWf7wdBX2hfF8zh9cs/3g6CvtCT1noZPqfEIiLE6DGq+6C6CYBMASTAmANkqta9GcCtfq2/ErLVm6bsXoN2ZiYwmNiVW5yv/AEnPWSsQDPRnArX6tvxKNejOBWv1bfiScrf0nPWU5W/pOerZfGCNejOBWv1bfiUa9GcCtfq2/EpnK39Jz13cmmtqbdXuarje1ObmkxE46InjlHb4wcayZ2sqPawWS0i84Nl1MXRJiXdtgNtdjK1ZzKNR7XBrg0w4jAHRMHStxcjOps2SuAJ7m5YvToWgPUV5lutzg5wt1FobjD6YDj5gw7OC2MnNqWp4bVrXrgBdAaMHE6GgQAbpE8S41kytZNTpXqlRpZTY2qLk3nNaAYcTp0rrZl2mnVtNqqUQdTIpXZERAIg8eBXB0bKK3/GUWwR3fr3N7lvW+5xqlVqNRq/lW79XH+y30qYaA1ogDAALJSoXclY7AtPLPgj5ulbi0ss+CPm6VtodZHiacp6mfB+jK8pQFQvbPmQiKUIFCIgNhrAAMNgaZOnQAB4l51mAaP3oOHFBCltbCCJ2NJGG0Y0rB7yVgk76TZJxtZFJzw8N+EP1Kp5B78+R+bVbM8B3b8Jv6lVMh+EPkfm1efX1yPbpfTR4L+iw2cS4cWK2q57V3knoXjYm6T5ltVAAwuO0YHGJ/fnXIcr0s88zmXbVQJ/ieIx2IOMeb2r7EvjOaTybbZyd8HQV9mSes9LJ/wArCIixN4UhYVQS0gOukggOiYMYGDphVejZLQO+ywxw8lgPjBDlUrgtZUKqVbJaDoywxo8lh9pf+4WHYFp/nbfQp/ErhW/19iFuUqodgWn+ds9Cn8SdgWn+dt9Cn8SYe/19gW5RVqNaC5zg1oEkkgAAaSSdC5uRiWMDKtsbXfePbdo0wdDboOP+VlnHUuWas6JusJg8ULF32B6tBP0/ZuG0PWs61rZTy62AKLxUc7Q5pD2icMCMCquyy0y0OdZmudWYx7HOEuhwDpw0mDEba62arfrFem5gBotpgcReCTGwBEDlXnPKJ5R+HSTjJfnb/T3Le3s58OLPTrf8QVnte7/d3xqyWAVNTbqpl8Y6NvCY2Yhe6Iu+McMUt287YqysSFqZWbNMjxDzzA9q2lqZYdFIxxdK3Uesjbeasp6mfB+jK4iKV7h8uQiKQEBAUyoRChApUFAUzPHw34Q/UqnkHvz5H5tVqzw8N+GP1Kq5vt7oeNuHpNXmV9cj3qf00eCLVZmw0cqytHeu8k9CzXlX713knoXIch5Zn/bLP94Ogr7QvjGaA+uWfb1QdBX2dJ6z0sn1PiERFidBjUYHAtcJDgQRtgiCFwdZNh4N72t8a7z3hoJJAABJJ0ADEkrkjOmx8KZzupZRxbCGvrJsPBve1vjU6yrDwf3tb41766bHwpnO6k102PhTOd1LK9TvGg19ZNh4N72t8aaybDwb3tb41sa6bHwpnO6l0rHamVWCpTeHsdMOGgwSD7QR5lMU1ruDk0M0LGxzXts8OYQ5p1SqYLTIMF8HHbXQyzYzWoVKQcAXsLQToBOiVuLUytbNRo1Kt29caXXZiSNAnYWN22Ur1myLlGm1jG26iG02hrBqbTAAgCTTnQNK3s3cjVqNWtWr1m1H1rklojvZxiABpGgbC0rPnBbnta9mTJa4BzTqrcQRIOK3s3su1K9StSq2fUn0rki9e76cDhxDlWbxW2EO6iItZQtLLPgj5ulbq0ss+CPm6VtodZHiaMq6mfB+jK+oRF7Z8wFKKEAQBAplAQSpULK7GlLmSRSs8B3b8IfqVXzZE1j5BPtarPnie7fhD9Sreao7o7yP1NXmVtcj3IfSrgWdYWjvXeSehei87Qe1d5J6CuQ5TxzP+2Wf7wdBX2hfHM0rM8WuzuLHAaoMSDGgr7GrM9OhqfEIiLA3mFYw1xu3sD2uHbYd7jhjoVM7MH+3vds/tK7IqnYFI7MH+3vds/tKzMyLZiATY6AkAwaVKRxHBdBZKuXzSDn/AEJZeCUPVU/hW5RotY0NY0NaNDWgNaPEBgF6KFiAuVnZ9ktH3bl1l51qLXtLHNDmuBDgRIIOkFE7MHCzfy1Z22ag11qpNc2jTBBe0EEMAIInArUzZrNfbra9jg5p1KC0ggiCMCF1tbVk4JT9FbVhyZRozqVJrL0XrogmJieUrK8dJDcKhEWJQtLLPgj5ulbq0sseDI8XSttHrI8TRlPUz4P0ZX4RSeJYr2kfMsIAgUyqQhEWQQoA2T5lDihKgKJFvsRSs8PDfhj9Sr+a4h5+7P8A2arFngO7fhD9SreQazWPJc4AXIkmMZavOra5HuQ+miu5FmXrZu+8zonReum77YWiLfS31nKFJt9LfafKFyWe451GSeoB7m9sJa4QQ7tg++I75xwxdIjzhBnnbr7g21uugm72lE4Thjck4LTt9tougGowxjiZSyPs8d9Sx8Sy8DfnGloTN2tnrb8ItZ9XR+BeRz3t/Cz6uj8C0rTXs8wHU/YvLVaG6p8oU8CqpLv8zoa98ocMPq6HwL1oZ5ZQOJtjg0aTqdD2douW2pQ03qeGnRoWVW1UDgHU7o0DBPAucl3+Zvvz3t+xa3Ro8HR5e8WOvfKHDD6uh8C54rUN1T9izpOoEjtqcTthPAZyXf5nYbnlb4E2o+ro/AmvO3cKPq6PwLUNez7ql7Fi+vZgCb1L2K+Brzk+/wAz1fnvb5+1mPu6PwLsVM7Lbe7WvILpE02EFhDbt0hsboknRG0qoalDdU/Ysha6QF3VGRtXsORTwNqqSW/zOvb89LcHANth0Y9pRM4mD3my26fOtbXvlDhh9XQ+Bc8VaG6p+xSatAfxU+UJ4Ezku/zPTKWfuUm3bttcJme52fi26a+i5vZbtFSy0Kj6svfRpucbrBLnNBJgCBivkWWdTcWXLp76YjihfUM1x9Us/wBzS/8AMLtyaEXrS8Uc+W1ZxpxwtrS9rXod4ZSrbv2NXnabU9+DnEx4h7AvEn/KxXWqcE7pJeB5sq1Rqzk34v3CKVBWw1BEUwgCiURAFKKChSn50MvVw3dMYPFJIleWsM8K93862M6GltdjyMC1sf8AFxkePRyq2NcCJBkHEEaIO0vOqNqbPo8lSdCHApmsQ8KHq/nTWIeFe7+dXRQ4wCVhiZvsigVcxzJ+s+7+dbQzEIH2oaMe5/OrRSEkBbFpdDTyJdixRHZkk/6ker+dY6xzwker+dXJFbixTjmSeE+7+dDmQeEj1fzq4KQl2LFOGY54T7v5162bMYkk9kj1fzq2FbVlbDfGo2LFR1hnhXu/nXnXzGIH2kY//P51eVqWt2MbSYmLIpAzJPCfd/Oo1jnhI9X86uKlLixT9ZBH+pHq/nUayDwker+dXFQrcWKfrHPCR6v51eMk2bUqFKnM3KVNsxE3QBMbC8Fv0xAHktW/J9bPM+07YI8TNRCBTK7DyCJQogQgAUqEQoUooQgQL2ZR2524A2NsyVhUZH7/ACWKkm7GWBpXPG0Wdj23XtDhtH94eNYWazNpi6wQNqXEDxScF7IjjF60WNScVaLa4Nr0HnR4BEbClAVM3HcjPP1e3Lm/c820wMQsnMB0rNoRxUwR3DP1LXxv+T9zx1EbXSqizKFXVXNvmA5wAgbBw2FcgqHT8O/yqn/YrRlMUkrHofZtSU5SUpN6tbvvOmLW/ddCdmP3XsC8Cvez2e9iTAmMBJJ0wAuO569h2W/ddCs9HvR4h0Ks2my3RIJ4wRBE6DgSCFZaPet8kdC6cmSk3c837SnKCjhbWvU2t24znjWDqTTj1rNSuzNx3LkeT0ir23/J+5hqI2ulY6iNrpXopaMVMEdwVeq/1vmzyFBu10qTRG10r1cdhYooR3Irr1e3Lm/cwbSaNAWYQIVkklqNcpyk7yd+LBRZU2SfafEvV1DanziJ9uHnRySCg2tB4hQiKkuFICgIhAiKUB7CoCMeLSJ0TB9qwq1J/fEB+QXmgWKik7mTm2rAIpKhZGIXnab103Bj+50r0CklYyTasjKLUXdq/ccGoy0nZqx5R61gaFp26vpO61YFIWno63s7/vGfZjy/0rwoWjbq+k7rXiMnVZnUjO3grMUU6Mt7C+0prVGPn7nLo2QlovUgDs4BbVCgALpZGJIMCMRBBjiW2FCdGjvZfvOoti8/c1alARdFP2ADEgmB/wAR7ViGP23cq3FKvR0trJ95TeuK8/c07j9t3KouP23cpW4idHW9k+8Z9mPL/TUDKm27lW1ScYg8u2s5WKyhSwu9zXWyt1I4XFcVr9QgUhCtxyEEoikIQypOjToIhepqgYjEnHARszs8f5rwKhYuKZmptBTCBQVkYhEWQKERiiIEBKFEQpCIiECIpCAQoSUQMIpUIUIilCIKFKiEDClFCFClQFMoEQUUoAhCEQogAUokoUhEKlCBQiIDhWfOUVHXadmqvcdDWAF3IMUr5zNY4sfZ6rHDS1wAcPGDisczKjTSfTaW6qXSWkjt23HBkgkXgHkOLRxHGIWGdFqoPdQa514scRUuEEsYbl5gLSRuiGgkNdeAwhas5+Jht7nb0WKpKeLS+XPuJ120t6fzetNdtPen83rWpWr2M6m111wa5jCWCqGBhdVe+5ehxHbsBLpdAMbawrixd1AuCXOuFpruLW3WllwuaAZcHh18fxNjRKzU12XyMOjrZKPM3jnbT3p/N61Ou2lvT+b1rSqusLnMutaxrajS+NWJdTD619uJd2xayjERi84j+HzZa7NqTDDGVLlZrgwVQ689te4C4uulnbUWjS44yYbiUv2vl8v4DMRvplHnw99p0ddtLen83rUa7ae9P5vWtOo/J5LQGBoFTSDWlzL1RovyThdFJxiD2zo2hixti7sTdEuOptBrm6yHiGG6JfeFM9v2sO2DMMa7L5E6Ou1Hn/nxm9rtp70/m9aDO2nvT+b1rzqOyYCYa10zoNoDQ27aCwiSHXpFnDpwlzo2SODlXUtVfqHg8C3vsJaCQL2MAyMdpWMlJ2s1xQnRUFfEnwdyxa7ae9P5vWmu2nvT+b1qpItlkacKLaM7aW9P5vWmu2nvT+b1qpImFDCi267ae9P5vWmu2nvT+b1qpImFFsW3XbT3p/N6012096fzetVJEsiYUW7XbS3p/N61Gu2nvT+b1qpImFDCi267ae9P5vWhztp70/m9aqSJhQwotuu2nvT+b1qddtLen83rVRW7QqUBTAdScX3gSZN0tvAkaRsSNGyMRGMaS2GSgmWA52096fzetNdtPen83rXHFayXR3F5dBk3iBMGCRexAMaI0HxLJ1osRH2Z4dB/iJaCQ66QCZMG7s7fnwxftfzxM8yu0vP2OsM7ae9P5vWmu2nvT+b1rgmrZ70ii67fcSC494ZutmdIw5NJXrqli3qt6TOTxK3tsZM0t65nZ12096fzetTrtpb0/m9a49R9iwAZW0YkFpknxxoJO1g0bcjSt7qJI1FrmjGbxBPFEImnsZHSSV7r54Gm5ZBEW3YYbSURFDMIiKAIiKgIiIQIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/9k=",
        //   "data:image/png;base64,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",
        //   "data:image/jpeg;base64,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"]
    return this.medias
  }}
}
</script>


<style scoped src="../assets/css/detailAd.css">
</style>
<style >
.carousel-control-next-icon,.carousel-control-prev-icon {
  border-radius: 50%;
  border: black;
  background-color: black;
}
</style>

